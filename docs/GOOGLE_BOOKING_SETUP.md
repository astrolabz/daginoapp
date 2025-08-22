# Prenotazioni con Google Forms + Sheets + Apps Script + Calendar

Questa guida completa il sistema prenotazioni già presente in `apps-script/Code.gs` e nel piano `GOOGLE_FORMS_RESERVATION_PLAN.txt`.

Obiettivo
- Modulo pubblico per raccogliere prenotazioni (Google Forms).
- Salvataggio privato su Google Sheets (solo admin).
- Email automatica con link di conferma/annulla (Apps Script Web App).
- Creazione evento su Google Calendar alla conferma.
- Controllo capacità e duplicati.

Prerequisiti
- Account Google con accesso a Forms, Sheets, Calendar, Apps Script.
- 1 calendario (dedicato o "primary").

Step 1 — Crea/Seleziona il Calendario
1. Vai su Google Calendar e crea un calendario dedicato (consigliato).
2. Apri le impostazioni del calendario: copia l'ID (es. `abcdefghi123@group.calendar.google.com`) oppure decidi di usare `primary`.

Step 2 — Crea il Google Sheet
1. Crea un nuovo Google Sheet vuoto.
2. Imposta la prima riga (intestazioni) usando esattamente i nomi del file:
   - vedi `docs/GOOGLE_BOOKING_SHEET_HEADERS.csv` (puoi incollare la riga 1 nel foglio).
3. Nota: l'ordine delle colonne non è importante, ma i nomi devono combaciare esattamente.

Step 3 — Crea il Google Form collegato
1. Dal tuo Sheet, vai su Inserisci → Modulo (o Strumenti → Crea modulo).
2. Crea le domande con questi titoli esatti:
   - "Nome" (Risposta breve)
   - "Email" (Risposta breve) oppure, nelle impostazioni del Form, abilita "Raccogli indirizzi email" (in tal caso lo script userà "Indirizzo email").
   - "Persone" (Numerico o risposta breve)
   - "Data" (Tipo Data)
   - "Ora" (Scelta multipla o menu a discesa) — Inserisci gli slot suggeriti in `docs/GOOGLE_BOOKING_SLOTS_13_30_to_20_00.txt`
3. Collega il Form al Sheet (in genere è già collegato se creato dallo Sheet).

Step 4 — Incolla lo script Apps Script
1. Nel Google Sheet apri Estensioni → Apps Script.
2. Cancella l'eventuale boilerplate e incolla l'intero contenuto di `apps-script/Code.gs` (presente nella repo).
3. Salva.

Step 5 — Configura la sezione CONFIG in Code.gs
Apri il file e imposta:
- `CALENDAR_ID`: usa `'primary'` oppure l'ID del calendario dedicato.
- `TIMEZONE`: es. `'Europe/Rome'` (di default usa `Session.getScriptTimeZone()`).
- `SLOT_MINUTES`: durata tavolo in minuti (default 90).
- `CAPACITY_PER_SLOT`: max prenotazioni sovrapposte (default 20).
- `TOKEN_EXPIRATION_MINUTES`: scadenza link conferma (default 90).
- `SENDER_NAME`: nome visualizzato nelle email (es. "Ristorante Da Gino").
- `WEB_APP_URL`: lo imposterai dopo il deploy del Web App (Step 6).
- `ADMIN_EMAILS`: array di email admin per notifiche (es. `['booking@tuodominio.it']`).

Step 6 — Deploy come Web App (per link conferma/annulla)
1. In Apps Script: Deploy → Nuovo deployment → Tipo: "Web App".
2. Descrizione: "Prenotazioni".
3. Esegui l'app come: "Me (proprietario)".
4. Accesso: "Chiunque" (serve per consentire ai clienti di cliccare conferma/annulla senza login).
5. Conferma e copia l'URL generato.
6. Torna in `CONFIG.WEB_APP_URL` e incolla quell'URL. Salva.

Step 7 — Imposta il Trigger onFormSubmit
1. In Apps Script: Triggers (icona orologio) → "Aggiungi trigger".
2. Scegli `onFormSubmit` come funzione di destinazione.
3. Origine evento: "Dall'invio del modulo".
4. Salva. Autorizza se richiesto.

Step 8 — Test end‑to‑end
1. Invia una prenotazione di prova dal Form.
2. Dovresti ricevere un'email "Conferma la tua prenotazione" con due link: conferma e annulla.
3. Clic su "Conferma": verifica
   - Stato riga su Sheet → `CONFIRMED`
   - Evento creato su Calendar (titolo "Prenotazione: Nome (pax)") 
   - Email di conferma inviata all'utente
4. Clic su "Annulla": verifica
   - Stato riga → `CANCELLED`
   - Eventuale evento Calendar rimosso
   - Email annullamento inviata

Step 9 — Orari disponibili e capacità
- Imposta la domanda "Ora" con gli slot che preferisci (lista consigliata: vedi `docs/GOOGLE_BOOKING_SLOTS_13_30_to_20_00.txt`).
- Lo script rifiuta conferme se:
  - Capacità slot raggiunta (`REJECTED_CAPACITY`)
  - Esiste già prenotazione attiva per la stessa email in sovrapposizione (`REJECTED_DUPLICATE`)
  - Link scaduto (`EXPIRED`)

Step 10 — Sicurezza e privacy
- Il Google Sheet resta privato (solo admin).
- Il Web App espone solo azioni conferma/annulla; non mostra dati del foglio.
- Le email vengono inviate tramite `MailApp` (quota Apps Script: ok per volumi moderati).

Troubleshooting
- "Link non valido": token non trovato o già usato → inviare nuova prenotazione.
- Nessuna email: controllare autorizzazioni di `MailApp` e cartella Spam.
- Evento non creato: controllare `CALENDAR_ID` e autorizzazioni Calendar dell'account proprietario.
- Quota raggiunta: ridurre test ravvicinati o pianificare invii.

Personalizzazioni rapide
- Modifica `SENDER_NAME` e i testi email in `onFormSubmit`/`doGet` (in `apps-script/Code.gs`).
- Cambia `SLOT_MINUTES`, `CAPACITY_PER_SLOT` e orari di apertura se vari (funzione `isOpenSlot`).
- Aggiungi indirizzi in `ADMIN_EMAILS` per ricevere notifice conferma/annulla.

Checklist (riassunto)
- [ ] Calendario creato e ID copiato
- [ ] Sheet con intestazioni corrette
- [ ] Form collegato e domande con nomi esatti
- [ ] Apps Script incollato e CONFIG compilata (tranne WEB_APP_URL)
- [ ] Web App deploy → incolla URL in CONFIG.WEB_APP_URL
- [ ] Trigger onFormSubmit attivo
- [ ] Test invio → conferma → calendario → email