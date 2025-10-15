# Google AI Agents Integration - Jules & Gemini CLI

## 📋 Panoramica

Questa guida descrive come integrare i nuovi AI agents di Google (Jules e Gemini CLI GitHub Agent) nel workflow di sviluppo del progetto daginoapp per automatizzare code review, gestione issue, testing e altri task ripetitivi.

## 🤖 Agents Disponibili

### 1. Jules
**Tipo**: AI coding agent autonomo  
**Focus**: Task standalone (review PR, fix bugs, implement features)  
**Accesso**: Browser + CLI + API  
**Status**: In beta (Ottobre 2025)

### 2. Gemini CLI GitHub Agent
**Tipo**: AI agent asincrono GitHub-native  
**Focus**: Workflow automation (triage, review, test generation)  
**Accesso**: CLI + GitHub Actions  
**Status**: Open-source

---

## 🚀 Setup Gemini CLI GitHub Agent

### Installazione

#### Step 1: Installare CLI

```bash
# Global installation
npm install -g @google/gemini-cli

# O locale per progetto
npm install --save-dev @google/gemini-cli
```

#### Step 2: Configurare API Key

1. Ottieni API key da [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Aggiungi a GitHub Secrets:
   - Nome: `GEMINI_API_KEY`
   - Valore: Your API key

3. Locale (development):
```bash
# .env
GEMINI_API_KEY=your_api_key_here
```

#### Step 3: Configurare GitHub Actions Workflow

Crea `.github/workflows/gemini-ai-review.yml`:

```yaml
name: Gemini AI Code Review

on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: read
  pull-requests: write
  issues: write

jobs:
  ai-review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Gemini CLI
        run: npm install -g @google/gemini-cli

      - name: Run AI Code Review
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          gemini-cli review \
            --pr ${{ github.event.pull_request.number }} \
            --repo ${{ github.repository }} \
            --comment \
            --auto-fix
```

### Funzionalità Automatizzate

#### 1. Code Review Automatica

```bash
# Review manuale da CLI
gemini-cli review ./src --output-format=markdown

# Review PR specifica
gemini-cli review --pr 123 --comment
```

**Controlla**:
- Best practices violazioni
- Security vulnerabilities
- Performance issues
- Code smells
- Type safety issues

#### 2. Auto-fix Suggerimenti

```bash
# Genera fix automatici
gemini-cli fix ./src/App.tsx --apply

# Preview fix senza applicare
gemini-cli fix ./src/App.tsx --dry-run
```

#### 3. Test Generation

```bash
# Genera unit tests per file
gemini-cli test ./src/components/GoogleAnalytics.tsx

# Genera test suite completa
gemini-cli test ./src --framework=vitest
```

#### 4. Documentation Generation

```bash
# Genera docstrings/JSDoc
gemini-cli docs ./src --format=jsdoc

# Aggiorna README basato su codice
gemini-cli docs --readme --update
```

---

## 🔧 Configurazione Avanzata

### File di configurazione `.geminirc.json`

```json
{
  "model": "gemini-1.5-pro",
  "temperature": 0.3,
  "review": {
    "autoComment": true,
    "autoFix": false,
    "severity": "warning",
    "rules": [
      "security",
      "performance",
      "best-practices",
      "accessibility"
    ]
  },
  "testing": {
    "framework": "vitest",
    "coverage": 80,
    "includeE2E": false
  },
  "docs": {
    "format": "jsdoc",
    "includeExamples": true,
    "language": "en"
  }
}
```

### Custom Prompts per Review

Crea `.gemini/review-prompt.md`:

```markdown
# Custom Review Guidelines for daginoapp

## Focus Areas
1. React 19 best practices
2. TypeScript strict type safety
3. Tailwind CSS class optimization
4. Accessibility (WCAG 2.1 AA)
5. GDPR compliance per cookies/analytics

## Ignore
- Legacy code in scripts/
- Generated files in dist/
- Third-party code in node_modules/

## Preferred Patterns
- Functional components with hooks
- TypeScript over PropTypes
- Named exports over default
- Radix UI components over custom
```

---

## 💡 Use Cases Pratici

### Use Case 1: Review Pull Request

```bash
# Quando apri una PR, il workflow automatico:
# 1. Analizza tutti i file modificati
# 2. Identifica potential issues
# 3. Suggerisce miglioramenti
# 4. Commenta direttamente sulla PR
# 5. (Opzionale) Crea commit con auto-fix
```

**Esempio output PR comment**:
```markdown
### 🤖 Gemini AI Review

#### ✅ Strengths
- Good TypeScript typing in GoogleAnalytics.tsx
- Proper error handling implemented
- GDPR compliance maintained

#### ⚠️ Suggestions
1. **Performance**: Consider memoizing `getText()` function (CookieConsent.tsx:113)
2. **Accessibility**: Missing aria-label on cookie toggle (CookieConsent.tsx:234)
3. **Best Practice**: Extract magic numbers to constants (GoogleAnalytics.tsx:15)

#### 🔧 Auto-fix Available
Run `gemini-cli fix --pr 42 --apply` to apply suggested fixes automatically.
```

### Use Case 2: Issue Triage Automatico

Workflow `.github/workflows/gemini-triage.yml`:

```yaml
name: Gemini Issue Triage

on:
  issues:
    types: [opened]

jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Triage Issue
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          gemini-cli triage \
            --issue ${{ github.event.issue.number }} \
            --label \
            --assign \
            --priority
```

**Azioni automatiche**:
- Aggiunge labels (bug, feature, documentation, etc.)
- Assegna priority (P0-P3)
- Suggerisce assignee basato su expertise
- Identifica duplicati

### Use Case 3: Continuous Refactoring

```bash
# Weekly scheduled job
name: Gemini Code Quality

on:
  schedule:
    - cron: '0 6 * * 1'  # Every Monday 6 AM

jobs:
  refactor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Analyze & Suggest Refactoring
        run: |
          gemini-cli refactor ./src \
            --create-issue \
            --threshold=high
```

---

## 🎯 Integrazioni con Workflow Esistenti

### Integrazione con CI Workflow

Aggiorna `.github/workflows/ci.yml`:

```yaml
jobs:
  # ... existing jobs ...
  
  ai-quality-check:
    name: AI Quality Analysis
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      
      - name: Install Gemini CLI
        run: npm install -g @google/gemini-cli
      
      - name: Run Quality Check
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
        run: |
          gemini-cli quality ./src \
            --fail-on=high \
            --report=json > quality-report.json
      
      - name: Upload Report
        uses: actions/upload-artifact@v4
        with:
          name: quality-report
          path: quality-report.json
```

---

## 📊 Metriche & Monitoring

### Dashboard Gemini AI

Traccia metriche automation:
- PR review time ridotto
- Bugs catturati pre-merge
- Code quality trend
- Test coverage migliorato

### Metriche da Monitorare

```bash
# Weekly report
gemini-cli metrics --period=week

# Output esempio:
# 📊 Gemini AI Metrics (Last 7 days)
# 
# Reviews:              42 PRs
# Issues Triaged:       15 issues
# Auto-fixes Applied:   8 commits
# Tests Generated:      23 files
# Avg Review Time:      2.3 min (↓35%)
# Bugs Prevented:       12 (severity: 3 high, 9 medium)
```

---

## 🛡️ Security & Privacy

### Best Practices

1. **API Key Protection**
   - Mai committare API keys
   - Usa sempre GitHub Secrets
   - Rotate keys ogni 90 giorni

2. **Code Privacy**
   - Gemini CLI processa code localmente quando possibile
   - No code storage su server Google (oltre session context)
   - Opt-out analytics: `gemini-cli config set telemetry false`

3. **Review Approval**
   - Auto-fix richiede sempre approval umano
   - Critical changes flagged for manual review
   - Audit log di tutte le azioni AI

---

## 🔄 Alternative: Jules Integration

### Jules Setup (Quando disponibile)

```bash
# Install Jules CLI
npm install -g jules-tools

# Authenticate
jules auth login

# Configure for repo
jules init --repo=astrolabz/daginoapp
```

### Jules Workflow Example

```yaml
name: Jules Autonomous Coding

on:
  issues:
    types: [labeled]

jobs:
  jules-implement:
    if: contains(github.event.issue.labels.*.name, 'jules-implement')
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Jules Implement
        env:
          JULES_API_KEY: ${{ secrets.JULES_API_KEY }}
        run: |
          jules implement \
            --issue ${{ github.event.issue.number }} \
            --create-pr \
            --run-tests
```

**Jules capabilities**:
- Implementa features autonomamente
- Crea PR completi con tests
- Iterazione multi-step per task complessi
- Self-verification prima submit

---

## 📚 Risorse Aggiuntive

### Documentation
- [Gemini CLI Docs](https://ai.google.dev/gemini-api/docs/cli)
- [Jules Documentation](https://jules.ai/docs) (quando disponibile)
- [Google AI Studio](https://makersuite.google.com/)

### Community
- [Gemini Developer Forum](https://discuss.ai.google.dev/)
- [GitHub Discussions](https://github.com/google/generative-ai-js/discussions)

### Tools
- [Gemini API Playground](https://makersuite.google.com/app/prompts/new_freeform)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=GoogleCloudTools.cloudcode)

---

## ⚠️ Limitazioni Attuali (Ottobre 2025)

1. **Gemini CLI**: Beta stage, API potrebbe cambiare
2. **Jules**: Limited preview access, non ancora pubblico
3. **Token Limits**: Rate limiting su API calls
4. **Context Window**: Max 1M tokens per richiesta
5. **Language Support**: Migliore per JavaScript/TypeScript, altri in sviluppo

---

## 🎯 Next Steps Raccomandati

### Immediate (Prossima Settimana)
1. [ ] Ottenere Gemini API key da Google AI Studio
2. [ ] Configurare `GEMINI_API_KEY` in GitHub Secrets
3. [ ] Testare `gemini-cli review` manualmente su branch feature
4. [ ] Creare `.geminirc.json` con configurazione progetto

### Short-term (Prossime 2 Settimane)
5. [ ] Implementare workflow AI review automatico su PR
6. [ ] Testare auto-fix su issue non-critici
7. [ ] Generare tests per componenti principali
8. [ ] Monitorare metriche per 2 settimane

### Long-term (Prossimo Mese)
9. [ ] Valutare Jules quando disponibile pubblicamente
10. [ ] Espandere automation a issue triage
11. [ ] Implementare scheduled refactoring suggestions
12. [ ] Integrare con workflow esistenti (CI/CD)

---

## 💬 Conclusioni

### Vantaggi
✅ Review code automatica 24/7  
✅ Cattura bugs prima del merge  
✅ Riduce carico review manuale  
✅ Migliora code quality consistentemente  
✅ Genera test automaticamente  

### Svantaggi
⚠️ Richiede configurazione iniziale  
⚠️ Costi API (free tier limitato)  
⚠️ False positives occasionali  
⚠️ Richiede supervision umana  
⚠️ Beta stage, API può cambiare  

### Raccomandazione
**Inizia gradualmente**: Testa su PR non-critici, monitora qualità suggerimenti, espandi automation quando confortevole. L'AI è assistente, non sostituto del developer.

---

**Documento creato**: Ottobre 15, 2025  
**Ultima revisione**: Ottobre 15, 2025  
**Status**: ⏳ **Pronto per implementazione quando Jules/Gemini CLI saranno disponibili**  
**Note**: Alcuni comandi sono ipotetici basati su pattern comuni, da verificare con docs ufficiali al momento rilascio
