# Google Analytics 4 - Guida Implementazione

## 📊 Panoramica

Il sito **ristorantedagino.nl** è ora configurato con Google Analytics 4 (GA4) per tracciare e analizzare il comportamento dei visitatori in modo privacy-compliant e conforme al GDPR.

## ✅ Caratteristiche Implementate

### 1. **Privacy & GDPR Compliance**
- ✅ Cookie consent banner multilingua (IT, NL, EN, ES, FR, DE, PT)
- ✅ Consenso esplicito dell'utente prima di attivare analytics
- ✅ IP anonimizzati automaticamente (`anonymize_ip: true`)
- ✅ Disabilitazione segnali pubblicitari (`allow_ad_personalization_signals: false`)
- ✅ Cookies con scadenza ridotta (2 mesi invece di 2 anni)
- ✅ Salvataggio preferenze utente per 1 anno

### 2. **Componenti Implementati**

#### `GoogleAnalytics.tsx`
Componente React che:
- Carica lo script GA4 solo se l'utente ha dato il consenso
- Disabilitato automaticamente in development (configurabile)
- Configurazione privacy-first integrata
- Funzioni helper per tracking eventi personalizzati

#### `CookieConsent.tsx`
Banner di consenso cookies con:
- Design moderno e responsive
- Traduzioni in 7 lingue
- Opzioni granulari (Essenziali, Analytics)
- Persistenza delle preferenze utente
- UI/UX ottimizzata con shadcn/ui

### 3. **Tracking Eventi Personalizzati**

Il sistema include funzioni predefinite per tracciare:

```typescript
// Prenotazioni
trackReservation('thefork' | 'google' | 'phone')

// Visualizzazione menu
trackMenuView('antipasti' | 'pizze' | 'pasta' | ...)

// Cambio lingua
trackLanguageChange('it' | 'nl' | 'en' | ...)

// Cambio tema
trackThemeChange('light' | 'dark')

// Click social media
trackSocialClick('instagram' | 'facebook' | 'tripadvisor')

// Contatti
trackContactClick('phone' | 'maps' | 'email')
```

## 🚀 Setup e Configurazione

### Step 1: Creare Account Google Analytics

1. Vai su [Google Analytics](https://analytics.google.com/)
2. Crea un nuovo account o usa uno esistente
3. Crea una nuova proprietà GA4
4. Inserisci i dettagli del sito:
   - Nome proprietà: **Ristorante Da Gino**
   - Fuso orario: **Amsterdam (CET)**
   - Valuta: **Euro (EUR)**
5. Configura uno stream di dati web:
   - URL: `https://www.ristorantedagino.nl`
   - Nome stream: **Ristorante Da Gino Website**
6. Copia il **Measurement ID** (formato: `G-XXXXXXXXXX`)

### Step 2: Configurare le Variabili d'Ambiente

#### Opzione A: File .env locale (per sviluppo)

Crea un file `.env` nella root del progetto:

```bash
# .env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GA_ENABLE_IN_DEV=false  # true per testare in development
```

#### Opzione B: GitHub Secrets (per produzione)

1. Vai su GitHub → Settings → Secrets and variables → Actions
2. Aggiungi un nuovo secret:
   - Nome: `VITE_GA_MEASUREMENT_ID`
   - Valore: `G-XXXXXXXXXX` (il tuo Measurement ID reale)

3. Modifica `.github/workflows/deploy.yml` per includere il secret:

```yaml
- name: Build
  run: npm run build
  env:
    VITE_GA_MEASUREMENT_ID: ${{ secrets.VITE_GA_MEASUREMENT_ID }}
```

### Step 3: Configurazioni Consigliate in Google Analytics

#### Impostazioni Privacy

1. **Admin** → **Impostazioni proprietà** → **Raccolta dati**
   - ✅ Abilita "Enhanced measurement" per eventi automatici
   - ✅ Disabilita "Google signals" per maggiore privacy
   
2. **Admin** → **Conservazione dati**
   - Imposta conservazione eventi a **2 mesi** (GDPR-friendly)
   - Disabilita "Reset user data on new activity"

3. **Admin** → **Impostazioni stream di dati**
   - Abilita misurazione avanzata:
     - ✅ Visualizzazioni di pagina
     - ✅ Scroll
     - ✅ Click in uscita
     - ✅ Ricerche nel sito
     - ⚠️ Disabilita video e download file (non applicabili)

#### Eventi Personalizzati da Configurare

Crea questi eventi personalizzati in GA4 per migliore tracking:

1. **reservation_attempt**
   - Categoria: engagement
   - Parametri: method (thefork/google/phone)

2. **menu_view**
   - Categoria: engagement  
   - Parametri: category (antipasti/pizze/pasta/...)

3. **language_change**
   - Categoria: user_preference
   - Parametri: language (it/nl/en/...)

4. **theme_change**
   - Categoria: user_preference
   - Parametri: theme (light/dark)

5. **social_click**
   - Categoria: engagement
   - Parametri: platform (instagram/facebook/tripadvisor)

6. **contact_click**
   - Categoria: engagement
   - Parametri: method (phone/maps/email)

#### Report e Dashboard Consigliati

Crea dashboard personalizzati per monitorare:

1. **Conversioni Prenotazioni**
   - Eventi: `reservation_attempt` per metodo
   - Metriche: Tasso di conversione per sorgente traffico

2. **Engagement Menu**
   - Eventi: `menu_view` per categoria
   - Metriche: Categorie più visualizzate, tempo sulla pagina

3. **Preferenze Utente**
   - Eventi: `language_change`, `theme_change`
   - Metriche: Distribuzione lingue, preferenze tema

4. **Social & Contatti**
   - Eventi: `social_click`, `contact_click`
   - Metriche: Canali più utilizzati, conversioni

## 📈 Utilizzo dei Tracking Events

### Esempio: Tracciare Click su Prenotazione TheFork

```typescript
import { trackReservation } from '@/components/GoogleAnalytics';

// Nel componente ReservationSystem.tsx
const handleTheForkClick = () => {
  trackReservation('thefork');
  window.open('https://...thefork-url...', '_blank');
};
```

### Esempio: Tracciare Visualizzazione Categoria Menu

```typescript
import { trackMenuView } from '@/components/GoogleAnalytics';

// Quando l'utente visualizza una categoria
useEffect(() => {
  if (activeCategory) {
    trackMenuView(activeCategory);
  }
}, [activeCategory]);
```

### Esempio: Tracciare Click Social

```typescript
import { trackSocialClick } from '@/components/GoogleAnalytics';

// Link Instagram
<a 
  href="https://instagram.com/ristorantepizzeriadagino"
  onClick={() => trackSocialClick('instagram')}
  target="_blank"
>
  <InstagramLogo />
</a>
```

## 🔒 Privacy & Sicurezza

### Conformità GDPR

Il sistema implementato rispetta completamente il GDPR:

1. ✅ **Consenso preventivo**: Analytics si attiva solo dopo consenso esplicito
2. ✅ **Trasparenza**: Banner chiaro con descrizione scopo cookies
3. ✅ **Controllo utente**: Opzioni granulari (essenziali/analytics)
4. ✅ **Diritto all'oblio**: Preferenze cancellabili da localStorage
5. ✅ **Data minimization**: IP anonimizzati, cookies brevi, no advertising
6. ✅ **Conservazione limitata**: Eventi conservati max 2 mesi

### Cookie Utilizzati

#### Cookie Essenziali (sempre attivi)
- `selected-language`: Lingua selezionata dall'utente
- `theme`: Tema selezionato (light/dark)
- `dagino-cookie-consent`: Preferenze consenso cookies

#### Cookie Analytics (solo con consenso)
- `_ga`: Identificativo anonimo utente (2 mesi)
- `_ga_XXXXXXXXX`: Stato sessione GA4 (2 mesi)

## 🧪 Testing

### Test in Locale

1. Avvia il dev server con analytics abilitati:
```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX VITE_GA_ENABLE_IN_DEV=true npm run dev
```

2. Apri browser in modalità incognito
3. Accetta i cookies analytics nel banner
4. Verifica in Chrome DevTools:
   - Console: Cerca "Google Analytics" logs
   - Network tab: Cerca richieste a `google-analytics.com/g/collect`
   - Application → Storage: Verifica cookies `_ga`

### Test in Produzione

1. Fai deploy su GitHub Pages
2. Apri il sito in incognito: `https://www.ristorantedagino.nl`
3. Verifica banner consenso cookies appare
4. Accetta cookies analytics
5. In GA4 Real-time report: verifica eventi in tempo reale

### Debug Eventi Personalizzati

Usa Google Tag Assistant o GA4 DebugView:

1. Installa [Google Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Abilita debug mode: `?gtm_debug=1` nell'URL
3. Monitora eventi in tempo reale in GA4 → DebugView

## 📊 KPI e Metriche Consigliate

### Metriche Principali
- **Visitatori unici** (mensili/settimanali)
- **Sessioni totali**
- **Durata media sessione**
- **Bounce rate**
- **Pagine per sessione**

### Metriche Conversione
- **Tasso conversione prenotazioni** (`reservation_attempt` / sessioni)
- **Click TheFork** vs **Google Booking** vs **Telefono**
- **Click social media** (Instagram, Facebook, TripAdvisor)
- **Richieste informazioni** (click telefono, maps, email)

### Metriche Contenuto
- **Categorie menu più visualizzate**
- **Scroll depth** (quanto scorrono la pagina)
- **Tempo su sezione menu**
- **Click su piatti specifici** (se implementato)

### Metriche Audience
- **Distribuzione geografica** (città/provincia)
- **Lingue utilizzate** (IT, NL, EN)
- **Dispositivi** (mobile, desktop, tablet)
- **Fasce orarie** (quando visitano il sito)

## 🔄 Manutenzione

### Verifiche Mensili
- ✅ Controllo dashboard conversioni prenotazioni
- ✅ Analisi trend visitatori
- ✅ Verifica funzionamento eventi personalizzati
- ✅ Review top pagine e sorgenti traffico

### Aggiornamenti Trimestrali
- 📅 Review obiettivi e KPI
- 📅 Ottimizzazione eventi basata su dati raccolti
- 📅 A/B testing su CTA prenotazioni
- 📅 Analisi stagionalità e pattern

## 🆘 Troubleshooting

### Analytics non si carica

**Problema**: Script GA4 non viene caricato

**Soluzioni**:
1. Verifica `VITE_GA_MEASUREMENT_ID` sia configurato correttamente
2. Controlla console per errori JavaScript
3. Verifica che l'utente abbia accettato cookies analytics
4. Controlla AdBlocker non blocchi richieste

### Eventi non tracciati

**Problema**: Eventi personalizzati non appaiono in GA4

**Soluzioni**:
1. Verifica `window.gtag` sia definito in console
2. Usa DebugView in GA4 per vedere eventi real-time
3. Controlla nome evento sia corretto (case-sensitive)
4. Verifica parametri evento siano validi

### Banner cookies non appare

**Problema**: Banner consenso non si mostra

**Soluzioni**:
1. Svuota localStorage: `localStorage.clear()`
2. Verifica import `CookieConsent` in `App.tsx`
3. Controlla console per errori render component
4. Verifica z-index banner non sia coperto

## 📚 Risorse Utili

- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Event Reference](https://support.google.com/analytics/answer/9267735)
- [GDPR Compliance Guide](https://support.google.com/analytics/answer/9019185)
- [GA4 Best Practices](https://developers.google.com/analytics/devguides/collection/ga4)

## 🎯 Prossimi Passi Consigliati

1. ✅ **Configurare Measurement ID** nei GitHub Secrets
2. ✅ **Testare in produzione** dopo primo deploy
3. ⏳ **Monitorare 1-2 settimane** per raccogliere dati baseline
4. ⏳ **Creare dashboard personalizzati** basati sui dati raccolti
5. ⏳ **Implementare tracking click specifici** su piatti menu
6. ⏳ **Configurare Goals/Conversions** in GA4
7. ⏳ **Integrare con Google Search Console** per SEO insights

---

**Data implementazione**: Ottobre 2025  
**Ultima revisione**: Ottobre 2025  
**Stato**: ✅ Implementato e pronto per deploy
