# 🎯 Guida Rapida: Attivare Google Analytics

**Data**: 16 Ottobre 2025
**Measurement ID**: `G-DTMNMNDYH7`
**URL Sito**: https://ristorantedagino.nl

---

## ✅ STATO ATTUALE

Il sito ha **già tutto il codice necessario** per Google Analytics!

Il componente `GoogleAnalytics.tsx` è:

- ✅ Già implementato
- ✅ Già integrato nell'App
- ✅ GDPR compliant
- ✅ Con Cookie Consent

**Serve solo configurare il Measurement ID nei GitHub Secrets!**

---

## 🚀 CONFIGURAZIONE RAPIDA (5 minuti)

### Passo 1: Aggiungi il Secret su GitHub

1. Vai su: https://github.com/astrolabz/daginoapp/settings/secrets/actions

2. Clicca su **"New repository secret"**

3. Compila:
   - **Name**: `VITE_GA_MEASUREMENT_ID`
   - **Secret**: `G-DTMNMNDYH7`

4. Clicca **"Add secret"**

### Passo 2: Verifica (Automatico)

Al prossimo push/deploy, Google Analytics si attiverà automaticamente!

Non serve fare nulla altro - il workflow già usa questo secret:

```yaml
# File: .github/workflows/deploy.yml (già configurato)
- name: Build
  run: npm run build
  env:
    VITE_GA_MEASUREMENT_ID: ${{ secrets.VITE_GA_MEASUREMENT_ID }}
```

---

## 🧪 TEST LOCALE (Opzionale)

Se vuoi testare in locale prima del deploy:

### Metodo 1: File .env (locale)

Crea un file `.env` nella root del progetto:

```bash
# .env (NON committare questo file!)
VITE_GA_MEASUREMENT_ID=G-DTMNMNDYH7
VITE_GA_ENABLE_IN_DEV=true
```

Poi:

```bash
npm run dev
```

### Metodo 2: Variabile inline

```bash
VITE_GA_MEASUREMENT_ID=G-DTMNMNDYH7 VITE_GA_ENABLE_IN_DEV=true npm run dev
```

Apri il sito su `http://localhost:5173` e:

1. Apri DevTools (F12)
2. Guarda Console - vedrai messaggi di GA
3. Vai su Network tab → filtra "gtag" → vedrai le chiamate a Google Analytics

---

## ✅ VERIFICA CHE FUNZIONI

### Dopo il Deploy su GitHub Pages:

1. **Vai sul sito**: https://www.ristorantedagino.nl

2. **Apri DevTools** (F12) → Console

3. **Cerca questi messaggi**:

   ```
   Google Analytics: Initialized with G-DTMNMNDYH7
   ```

4. **Network tab**: Filtra "gtag" o "collect" - vedrai chiamate a `google-analytics.com`

### Su Google Analytics Dashboard:

1. Vai su: https://analytics.google.com/

2. Seleziona la proprietà "Dagino" (Stream ID: `G-DTMNMNDYH7`)

3. Vai su **Reports** → **Realtime** (Tempo reale)

4. Apri il sito in un'altra tab

5. Dovresti vedere **1 utente attivo** in tempo reale! 🎉

---

## 📊 EVENTI TRACCIATI AUTOMATICAMENTE

Il sito traccia automaticamente:

### Eventi Standard (Page Views)

- ✅ Visualizzazioni pagina
- ✅ Scroll depth
- ✅ Click su link esterni
- ✅ File downloads

### Eventi Custom Implementati

- ✅ `reservation_attempt` - Click su bottone prenotazione (TheFork/Google/Telefono)
- ✅ `menu_view` - Navigazione categorie menu
- ✅ `language_change` - Cambio lingua
- ✅ `theme_change` - Cambio tema (dark/light)
- ✅ `social_click` - Click su social media (Instagram/Facebook/TripAdvisor)
- ✅ `contact_click` - Click su contatti (telefono/maps/email)

---

## 🔒 PRIVACY & GDPR

Il componente GoogleAnalytics è **già configurato** per essere GDPR compliant:

✅ **Consenso Cookie**: GA si attiva solo dopo il consenso utente
✅ **IP Anonimizzata**: `anonymize_ip: true`
✅ **No Advertising**: `allow_google_signals: false`
✅ **No Remarketing**: `allow_ad_personalization_signals: false`
✅ **Cookie Brevi**: 2 mesi invece di 2 anni
✅ **No Cross-site Tracking**: `linker: false`

---

## 🎯 COSA SUCCEDE DOPO

1. **Aggiungi il secret** → fatto in 30 secondi
2. **Prossimo deploy** → GA si attiva automaticamente
3. **Nessun altro cambiamento** necessario al codice
4. **Il sito continua a funzionare** perfettamente come prima

---

## 🔍 TROUBLESHOOTING

### GA non si attiva?

**Controlla**:

1. ✅ Secret `VITE_GA_MEASUREMENT_ID` è configurato su GitHub?
2. ✅ Cookie consent è stato accettato?
3. ✅ Il sito è caricato da `https://` (non `http://`)?
4. ✅ AdBlock è disabilitato? (disabilita per testare)

### Vedo "No valid measurement ID" in console?

- Il secret non è stato aggiunto o il deploy non è avvenuto dopo l'aggiunta

### Vedo "User has not given consent"?

- Accetta il banner cookie consent in basso al sito

### Non vedo dati in GA dashboard?

- Aspetta 24-48 ore per i primi dati completi
- Verifica in **Realtime** per dati immediati

---

## 📝 FILE COINVOLTI (Già Pronti)

| File                                 | Stato | Descrizione              |
| ------------------------------------ | ----- | ------------------------ |
| `src/components/GoogleAnalytics.tsx` | ✅    | Componente GA completo   |
| `src/components/CookieConsent.tsx`   | ✅    | Banner consenso cookie   |
| `src/App.tsx`                        | ✅    | GA integrato nell'app    |
| `.github/workflows/deploy.yml`       | ✅    | Workflow usa il secret   |
| `.env.example`                       | ✅    | Documentazione variabili |

**NON serve modificare NESSUN FILE!** 🎉

---

## 🎊 CONCLUSIONE

**Tutto è pronto!** Devi solo:

1. ✅ Aggiungere il secret `VITE_GA_MEASUREMENT_ID` = `G-DTMNMNDYH7` su GitHub
2. ✅ Fare un push (o ri-triggerare il deploy)
3. ✅ Aspettare 2-3 minuti per il deploy
4. ✅ Verificare su GA che funzioni

**Nessun rischio** - se qualcosa non va, GA semplicemente non si attiva e il sito continua a funzionare normalmente.

---

## 🔗 Link Utili

- **GitHub Secrets**: https://github.com/astrolabz/daginoapp/settings/secrets/actions
- **Google Analytics**: https://analytics.google.com/
- **Sito Live**: https://www.ristorantedagino.nl
- **Actions**: https://github.com/astrolabz/daginoapp/actions

---

**Domande?** Consulta: `docs/GOOGLE_ANALYTICS_SETUP.md` per la guida completa.
