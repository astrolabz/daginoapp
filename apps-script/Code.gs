/***** CONFIG *****/
const CONFIG = {
  CALENDAR_ID: 'INSERISCI_CALENDAR_ID_O_primary', // usa 'primary' o l'ID del calendario dedicato
  TIMEZONE: Session.getScriptTimeZone(),          // es. 'Europe/Rome'
  // durata stimata del tavolo in minuti
  SLOT_MINUTES: 90,
  // il ristorante ha circa 80 posti; assumendo ~4 persone per tavolo => 20 tavoli simultanei
  // CAPACITY_PER_SLOT rappresenta il numero massimo di prenotazioni confermate sovrapposte
  CAPACITY_PER_SLOT: 20,
  TOKEN_EXPIRATION_MINUTES: 90,                   // scadenza link conferma
  SENDER_NAME: 'Prenotazioni Ristorante',
  WEB_APP_URL: 'INSERISCI_URL_WEB_APP_DOPO_DEPLOY',
  ADMIN_EMAILS: ['tuoindirizzo@example.com']      // eventuali notifiche admin
};

// Nomi colonne: DEVONO combaciare con l’intestazione del foglio
const COL = {
  timestamp: 'Timestamp',
  nome: 'Nome e cognome',
  email: 'Email',
  telefono: 'Telefono',
  data: 'Data',
  ora: 'Ora',
  persone: 'Numero di persone',
  note: 'Note',
  token: 'Token',
  stato: 'Stato',
  inizio: 'Inizio',
  fine: 'Fine',
  creatoIl: 'CreatoIl',
  confermatoIl: 'ConfermatoIl',
  eventId: 'EventId'
};

/***** UTILITIES *****/
function getSheet() {
  return SpreadsheetApp.getActiveSheet();
}
function getHeadersMap_(sh) {
  const headers = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0];
  return Object.fromEntries(headers.map((h,i)=>[h, i+1]));
}
function fmt(dt, pattern='EEE dd/MM HH:mm') {
  return Utilities.formatDate(dt, CONFIG.TIMEZONE, pattern);
}
function overlaps_(aStart, aEnd, bStart, bEnd) {
  return (aStart < bEnd) && (bStart < aEnd);
}

// Check if a given start datetime is inside restaurant opening hours and not on closed days.
// Returns boolean. Assumptions (from provided schedule):
// - Open Monday, Tuesday, Thursday, Friday, Saturday, Sunday: 13:30 - 21:30
// - Closed Wednesday
// - Last seating start must allow the full SLOT_MINUTES duration (we will assume last start at 21:30 - SLOT_MINUTES)
function isOpenSlot(start) {
  const day = start.getDay(); // 0=Sun,1=Mon,...6=Sat
  // Wednesday closed
  if (day === 3) return false;
  // opening hours: 13:30 - 21:30
  const openH = 13, openM = 30;
  const closeH = 21, closeM = 30;
  const open = new Date(start);
  open.setHours(openH, openM, 0, 0);
  const close = new Date(start);
  close.setHours(closeH, closeM, 0, 0);
  // compute last allowed start = close - SLOT_MINUTES
  const lastStart = new Date(close.getTime() - CONFIG.SLOT_MINUTES*60*1000);
  return (start >= open) && (start <= lastStart);
}
function findRowByToken_(token, map, sh) {
  const last = sh.getLastRow();
  if (last < 2) return -1;
  const rng = sh.getRange(2, map[COL.token], last-1, 1).getValues();
  for (let i=0; i<rng.length; i++) {
    if ((rng[i][0] || '').toString().trim() === token) return i + 2;
  }
  return -1;
}
function countConfirmedOverlap_(start, end, map, sh) {
  const last = sh.getLastRow();
  if (last < 2) return 0;
  const vals = sh.getRange(2,1,last-1, sh.getLastColumn()).getValues();
  const iStato = map[COL.stato]-1, iInizio = map[COL.inizio]-1, iFine = map[COL.fine]-1;
  let count = 0;
  for (const row of vals) {
    if ((row[iStato] || '') !== 'CONFIRMED') continue;
    const s = new Date(row[iInizio]);
    const e = new Date(row[iFine]);
    if (overlaps_(start, end, s, e)) count++;
  }
  return count;
}
function existsDuplicateForEmail_(email, start, end, map, sh) {
  const last = sh.getLastRow();
  if (last < 2) return false;
  const vals = sh.getRange(2,1,last-1, sh.getLastColumn()).getValues();
  const iStato = map[COL.stato]-1, iInizio = map[COL.inizio]-1, iFine = map[COL.fine]-1, iEmail = map[COL.email]-1;
  for (const row of vals) {
    if ((row[iStato] || '') !== 'CONFIRMED') continue;
    if ((row[iEmail] || '').toString().trim().toLowerCase() !== email.toLowerCase()) continue;
    const s = new Date(row[iInizio]);
    const e = new Date(row[iFine]);
    if (overlaps_(start, end, s, e)) return true;
  }
  return false;
}

/***** FORM SUBMIT → invio email con link *****/
function onFormSubmit(e) {
  const sh = getSheet();
  const map = getHeadersMap_(sh);
  const row = e.range.getRow();
  const nv = e.namedValues;

  // Estrai campi
  const nome = (nv[COL.nome] || [''])[0].trim();
  // Se hai attivo "Raccogli indirizzi email" senza domanda Email, mappa nv['Indirizzo email'] → COL.email.
  const email = (nv[COL.email] || nv['Indirizzo email'] || [''])[0].trim();
  const persone = parseInt((nv[COL.persone] || ['1'])[0], 10) || 1;

  const dateStr = (nv[COL.data] || [''])[0];
  const timeStr = (nv[COL.ora] || [''])[0]; // "HH:MM"
  if (!email || !dateStr || !timeStr) return;

  const start = new Date(dateStr);
  const [hh, mm] = timeStr.split(':').map(Number);
  start.setHours(hh || 0, mm || 0, 0, 0);
  const end = new Date(start.getTime() + CONFIG.SLOT_MINUTES*60*1000);

  const token = Utilities.getUuid();
  const now = new Date();

  // Scrivi colonne di servizio
  sh.getRange(row, map[COL.token]).setValue(token);
  sh.getRange(row, map[COL.stato]).setValue('PENDING_EMAIL');
  sh.getRange(row, map[COL.inizio]).setValue(start);
  sh.getRange(row, map[COL.fine]).setValue(end);
  sh.getRange(row, map[COL.creatoIl]).setValue(now);

  // Link di conferma e annullamento
  const confirmLink = `${CONFIG.WEB_APP_URL}?action=confirm&token=${encodeURIComponent(token)}`;
  const cancelLink  = `${CONFIG.WEB_APP_URL}?action=cancel&token=${encodeURIComponent(token)}`;

  const subject = 'Conferma la tua prenotazione';
  const lines = [
    `Ciao ${nome || ''},`,
    ``,
    `clicca qui per confermare la tua prenotazione:`,
    `${confirmLink}`,
    ``,
    `Oppure annulla: ${cancelLink}`,
    ``,
    `Dettagli: ${fmt(start)} — ${CONFIG.SLOT_MINUTES} min, ${persone} persone.`,
    `Il link scade tra ${CONFIG.TOKEN_EXPIRATION_MINUTES} minuti.`,
    ``,
    `— ${CONFIG.SENDER_NAME}`
  ];
  MailApp.sendEmail({
    to: email,
    subject,
    htmlBody: lines.join('<br>'),
    name: CONFIG.SENDER_NAME
  });
}

/***** WEB APP: conferma / annulla *****/
function doGet(e) {
  const action = (e.parameter.action || 'confirm').toLowerCase();
  const token = (e.parameter.token || '').trim();
  if (!token) return html_('Link non valido.');

  const sh = getSheet();
  const map = getHeadersMap_(sh);
  const r = findRowByToken_(token, map, sh);
  if (r < 0) return html_('Link non valido o già usato.');

  const stato = (sh.getRange(r, map[COL.stato]).getValue() || '').toString();
  const createdAt = new Date(sh.getRange(r, map[COL.creatoIl]).getValue());
  const start = new Date(sh.getRange(r, map[COL.inizio]).getValue());
  const end = new Date(sh.getRange(r, map[COL.fine]).getValue());
  const email = (sh.getRange(r, map[COL.email]).getValue() || '').toString();
  const nome = (sh.getRange(r, map[COL.nome]).getValue() || '').toString();
  const persone = sh.getRange(r, map[COL.persone]).getValue();

  if (action === 'cancel') {
    // Cancella eventuale evento su Calendar
    const eventId = (sh.getRange(r, map[COL.eventId]).getValue() || '').toString();
    if (eventId) {
      try {
        const cal = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
        const ev = cal.getEventById(eventId);
        if (ev) ev.deleteEvent();
      } catch (err) { /* ignora */ }
    }
    sh.getRange(r, map[COL.stato]).setValue('CANCELLED');
    MailApp.sendEmail({
      to: email,
      subject: 'Prenotazione annullata',
      htmlBody: [`Ciao ${nome},`, `la tua prenotazione del ${fmt(start)} è stata annullata.`, `— ${CONFIG.SENDER_NAME}`].join('<br>'),
      name: CONFIG.SENDER_NAME
    });
    notifyAdmin_(`Annullata: ${fmt(start)} — ${nome} (${persone} pax)`);
    return html_('Prenotazione annullata. Ti abbiamo inviato un’email di conferma.');
  }

  // Conferma
  if (stato === 'CONFIRMED') return html_('Prenotazione già confermata.');
  if (stato === 'CANCELLED') return html_('Questa prenotazione è stata annullata.');
  if (CONFIG.TOKEN_EXPIRATION_MINUTES > 0) {
    const ageMs = Date.now() - createdAt.getTime();
    if (ageMs > CONFIG.TOKEN_EXPIRATION_MINUTES*60*1000) {
      sh.getRange(r, map[COL.stato]).setValue('EXPIRED');
      return html_('Link scaduto. Invia di nuovo la prenotazione.');
    }
  }

  // Capacità e duplicati
  const capUsed = countConfirmedOverlap_(start, end, map, sh);
  if (capUsed >= CONFIG.CAPACITY_PER_SLOT) {
    sh.getRange(r, map[COL.stato]).setValue('REJECTED_CAPACITY');
    return html_('Orario non più disponibile. Scegli un altro orario.');
  }
  if (existsDuplicateForEmail_(email, start, end, map, sh)) {
    sh.getRange(r, map[COL.stato]).setValue('REJECTED_DUPLICATE');
    return html_('Hai già una prenotazione attiva in questo orario.');
  }

  // Crea evento su Calendar
  const cal = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
  const title = `Prenotazione: ${nome} (${persone} pax)`;
  const desc = `Prenotazione confermata\nCliente: ${nome}\nEmail: ${email}\nPersone: ${persone}`;
  const event = cal.createEvent(title, start, end, { description: desc });
  const eventId = event.getId();

  // Aggiorna stato riga
  sh.getRange(r, map[COL.stato]).setValue('CONFIRMED');
  sh.getRange(r, map[COL.eventId]).setValue(eventId);
  sh.getRange(r, map[COL.confermatoIl]).setValue(new Date());

  // Email utente
  MailApp.sendEmail({
    to: email,
    subject: 'Prenotazione confermata',
    htmlBody: [
      `Ciao ${nome},`,
      `la tua prenotazione è confermata per ${fmt(start, 'EEEE dd/MM HH:mm')} (${CONFIG.SLOT_MINUTES} min), ${persone} persone.`,
      `Se non puoi venire, annulla qui: ${CONFIG.WEB_APP_URL}?action=cancel&token=${encodeURIComponent(token)}`,
      `— ${CONFIG.SENDER_NAME}`
    ].join('<br>'),
    name: CONFIG.SENDER_NAME
  });

  notifyAdmin_(`Confermata: ${fmt(start)} — ${nome} (${persone} pax)`);

  return html_('Prenotazione confermata! Ti abbiamo inviato un’email con i dettagli.');
}

/***** SUPPORTI HTML+ADMIN NOTIFY *****/
function html_(message) {
  return HtmlService
    .createHtmlOutput(`<div style="font-family:system-ui;padding:24px">${message}</div>`)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function notifyAdmin_(text) {
  if (!CONFIG.ADMIN_EMAILS || !CONFIG.ADMIN_EMAILS.length) return;
  try {
    MailApp.sendEmail({
      to: CONFIG.ADMIN_EMAILS.join(','),
      subject: '[Prenotazioni] Notifica',
      htmlBody: text.replace(/\n/g,'<br>'),
      name: CONFIG.SENDER_NAME
    });
  } catch (e) {}
}

/***** MENU ADMIN (facoltativo) *****/
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Prenotazioni')
    .addItem('Riepilogo capacità oggi', 'menuCapacityToday_')
    .addToUi();
}
function menuCapacityToday_() {
  const sh = getSheet();
  const map = getHeadersMap_(sh);
  const last = sh.getLastRow();
  const iStato = map[COL.stato]-1, iInizio = map[COL.inizio]-1, iFine = map[COL.fine]-1;
  const vals = last>1 ? sh.getRange(2,1,last-1, sh.getLastColumn()).getValues() : [];
  const today = new Date(); today.setHours(0,0,0,0);
  const tomorrow = new Date(today.getTime()+24*60*60*1000);
  let slots = 0, peak = 0;
  for (const row of vals) {
    if ((row[iStato] || '') !== 'CONFIRMED') continue;
    const s = new Date(row[iInizio]), e = new Date(row[iFine]);
    if (s >= today && s < tomorrow) slots++;
  }
  SpreadsheetApp.getUi().alert(`Prenotazioni confermate oggi: ${slots}\nCapienza per slot: ${CONFIG.CAPACITY_PER_SLOT}`);
}
