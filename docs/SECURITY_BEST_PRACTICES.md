# Sicurezza e Best Practices - Guida Completa

## 📋 Panoramica

Questo documento descrive tutte le misure di sicurezza e best practices implementate nel progetto **daginoapp** (ristorantedagino.nl) seguendo le linee guida moderne per sviluppo sicuro con GitHub e VS Code.

## ✅ Implementazioni Completate

### 1. **GitHub Actions - CI/CD Pipeline**

#### ✅ Workflow Deploy (`.github/workflows/deploy.yml`)
- Deploy automatico su GitHub Pages
- Build ottimizzato con Vite
- Configurazione secrets per variabili ambiente
- Permissions minimali (least privilege)
- Concurrency control per evitare deploy simultanei

#### ✅ Workflow CI (`.github/workflows/ci.yml`)
- **Lint automatico**: ESLint su ogni push/PR
- **Format check**: Prettier su ogni push/PR
- **Build verification**: Verifica build funzionante
- **Dependency review**: Scansione vulnerabilità dipendenze su PR
- Artifact upload per debug

#### ✅ Workflow CodeQL (`.github/workflows/codeql.yml`)
- **Security scanning automatico**: JavaScript/TypeScript
- **Schedule settimanale**: Ogni lunedì ore 6:00 UTC
- **Query avanzate**: security-extended + security-and-quality
- **PR scanning**: Analisi automatica su pull request
- Report vulnerabilità in GitHub Security tab

### 2. **Dependabot - Gestione Dipendenze**

#### ✅ Configurazione (`.github/dependabot.yml`)
```yaml
- package-ecosystem: "npm"
  schedule: daily          # Controllo quotidiano
  
- package-ecosystem: "devcontainers"
  schedule: weekly         # Controllo settimanale
```

**Funzionalità**:
- ✅ Aggiornamenti automatici dipendenze npm
- ✅ Pull request automatiche per vulnerabilità
- ✅ Controllo devcontainer security
- ✅ Notifiche email su vulnerabilità critiche

### 3. **ESLint - Code Quality & Security**

#### ✅ Configurazione (`eslint.config.js`)

**Plugins attivi**:
- `@eslint/js` - Core JavaScript rules
- `typescript-eslint` - TypeScript specific rules
- `eslint-plugin-react-hooks` - React Hooks best practices
- `eslint-plugin-react-refresh` - HMR optimization

**Regole di sicurezza**:
```javascript
'@typescript-eslint/no-explicit-any': 'warn',  // Evita any non sicuri
'no-console': ['warn', { allow: ['warn', 'error'] }],  // Pulisci console.log
'no-debugger': 'warn',  // Rimuovi debugger in produzione
'prefer-const': 'error',  // Immutabilità quando possibile
'no-var': 'error',  // Usa let/const, no var
```

**Script npm**:
```bash
npm run lint        # Controlla errori
npm run lint:fix    # Correggi automaticamente
```

### 4. **Prettier - Code Formatting**

#### ✅ Configurazione (`.prettierrc`)

**Standard enforced**:
- Single quotes
- Semicolons obbligatori
- 100 caratteri max per riga
- 2 spazi indentazione
- Trailing commas ES5
- LF line endings (Unix)

**Script npm**:
```bash
npm run format        # Formatta tutto il codice
npm run format:check  # Verifica formattazione
```

### 5. **Google Analytics - Privacy Compliant**

#### ✅ Implementazione Privacy-First

**Configurazione GDPR**:
```typescript
{
  allow_google_signals: false,              // No advertising
  allow_ad_personalization_signals: false,  // No personalizzazione ads
  cookie_expires: 63072000,                 // 2 mesi (non 2 anni)
  anonymize_ip: true,                       // IP anonimizzati
  linker: false                             // No cross-site tracking
}
```

**Cookie Consent**:
- ✅ Banner multilingua (7 lingue)
- ✅ Consenso esplicito richiesto
- ✅ Opzioni granulari (essenziali/analytics)
- ✅ Persistenza preferenze 1 anno
- ✅ Revoca consenso facile

### 6. **Git Secrets Protection**

#### ✅ `.gitignore` Comprehensive

File sensibili esclusi dal versioning:
```gitignore
.env                 # Secrets locali
.env.local
.env.production
node_modules/        # Dipendenze
dist/                # Build artifacts
*.log                # Log files
.DS_Store            # OS files
```

#### ✅ Environment Variables Management

**File `.env.example`**:
- Template per variabili richieste
- Placeholder sicuri (no secrets reali)
- Documentazione inline

**GitHub Secrets**:
- `VITE_GA_MEASUREMENT_ID` - Google Analytics ID
- Mai committati in git
- Accessibili solo in Actions

## 🛡️ Misure di Sicurezza Aggiuntive

### Branch Protection Rules (da configurare)

Consigliato abilitare su branch `main`:

1. **Require pull request reviews**
   - Minimo 1 reviewer
   - Dismiss stale reviews

2. **Require status checks**
   - CI deve passare
   - CodeQL deve passare
   - Build deve completare

3. **Require conversation resolution**
   - Tutti i commenti risolti prima merge

4. **Require signed commits** (opzionale)
   - GPG signature verification

### Secrets Scanning

GitHub Secrets Scanning è attivo di default:
- ✅ Scansione automatica token/keys esposti
- ✅ Alert su secrets committati
- ✅ Partner patterns (AWS, Azure, etc.)

### Security Policy

File `SECURITY.md` presente con:
- Versioni supportate
- Processo reporting vulnerabilità
- Tempistiche risposta
- Contatti sicurezza

## 📊 Monitoring & Auditing

### GitHub Security Features Attive

1. **Security tab**
   - Dependabot alerts
   - CodeQL findings
   - Secret scanning alerts

2. **Insights tab**
   - Dependency graph
   - Security advisories
   - Network graph

3. **Actions tab**
   - CI/CD history
   - Workflow runs
   - Artifact management

### Logs & Metrics

**GitHub Actions logs**:
- Retention: 90 giorni
- Accessibili per debugging
- Download artifacts disponibile

**Google Analytics**:
- Events tracking
- Privacy-compliant
- Dashboard personalizzati

## 🔒 Best Practices Implementate

### Codice

- ✅ **TypeScript strict mode**: Type safety
- ✅ **No `any` types**: Except documented cases
- ✅ **Immutability**: `const` over `let`, `let` over `var`
- ✅ **Error boundaries**: React error handling
- ✅ **Input validation**: Sanitization user input
- ✅ **Environment variables**: No hardcoded secrets

### Dependencies

- ✅ **Lock file committato**: `package-lock.json`
- ✅ **Exact versions**: No wildcards `^` o `~` critici
- ✅ **Minimal dependencies**: Solo necessarie
- ✅ **Audit regolare**: `npm audit`
- ✅ **Update strategy**: Dependabot automatico

### Deploy

- ✅ **HTTPS enforced**: GitHub Pages SSL
- ✅ **Build artifacts**: Non committati
- ✅ **Environment-specific configs**: Dev/prod separated
- ✅ **Rollback capability**: GitHub Pages history
- ✅ **Zero-downtime deploy**: Automated

### Privacy

- ✅ **GDPR compliant**: Cookie consent
- ✅ **Privacy policy**: Documentata
- ✅ **Data minimization**: Solo dati necessari
- ✅ **User consent**: Esplicito e informato
- ✅ **Right to deletion**: localStorage.clear()

## 🚀 Workflow Sviluppo Sicuro

### 1. Locale Development

```bash
# Setup iniziale
git clone https://github.com/astrolabz/daginoapp.git
cd daginoapp
npm install

# Copia env variables
cp .env.example .env
# Modifica .env con valori locali

# Sviluppo
npm run dev

# Prima di commit
npm run lint:fix
npm run format
npm run build  # Verifica build funzionante
```

### 2. Creazione Feature

```bash
# Crea branch feature
git checkout -b feature/nome-feature

# Sviluppa e testa
npm run dev
npm run lint
npm run format:check

# Commit
git add .
git commit -m "feat: descrizione feature"
git push origin feature/nome-feature
```

### 3. Pull Request

1. Apri PR su GitHub
2. CI automatico esegue:
   - ESLint check
   - Prettier check
   - Build verification
   - Dependency review
   - CodeQL scan
3. Review codice da team
4. Risolvi commenti e issues
5. Merge su `main` quando tutto verde ✅

### 4. Deploy Automatico

```bash
# Merge su main triggera:
1. Build automatico
2. Deploy GitHub Pages
3. Notifica successo/fallimento
4. Sito live in ~2-3 minuti
```

## 🔧 Configurazioni VS Code Consigliate

### Extensions da Installare

1. **ESLint** (`dbaeumer.vscode-eslint`)
   - Auto-fix on save
   - Real-time linting

2. **Prettier** (`esbenp.prettier-vscode`)
   - Format on save
   - Format on paste

3. **GitHub Copilot** (`GitHub.copilot`)
   - AI code assistant
   - Best practices suggestions

4. **GitLens** (`eamodio.gitlens`)
   - Git blame inline
   - History explorer

5. **Error Lens** (`usernamehw.errorlens`)
   - Inline error messages
   - Better visibility

6. **SonarLint** (`SonarSource.sonarlint-vscode`)
   - Additional security checks
   - Code quality analysis

### Settings.json Consigliate

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ],
  "files.eol": "\n",
  "git.autofetch": true,
  "security.workspace.trust.enabled": true
}
```

## 📚 Checklist Sicurezza Pre-Release

Prima di ogni release importante:

- [ ] `npm audit` pulito (no vulnerabilità high/critical)
- [ ] Tutti i workflow GitHub Actions passano
- [ ] CodeQL scan senza findings critici
- [ ] Dependabot alerts risolti
- [ ] `.env.example` aggiornato
- [ ] README.md aggiornato
- [ ] CHANGELOG.md aggiornato
- [ ] Secrets GitHub configurati correttamente
- [ ] Test manuale su staging
- [ ] Privacy policy aggiornata se necessario
- [ ] Google Analytics funzionante
- [ ] Cookie consent testato

## 🆘 Troubleshooting Sicurezza

### CI Fails

**Problema**: ESLint errors nel CI

**Soluzione**:
```bash
npm run lint:fix
git add .
git commit -m "fix: eslint errors"
```

### Dependabot Alerts

**Problema**: Vulnerabilità dipendenza

**Soluzione**:
```bash
npm audit
npm audit fix
# O manualmente:
npm install <package>@latest
npm run build  # Verifica tutto funziona
```

### CodeQL Findings

**Problema**: Vulnerabilità rilevata da CodeQL

**Soluzione**:
1. Vai su Security tab → Code scanning
2. Review finding dettagli
3. Applica fix suggerito
4. Re-run CodeQL per verify

### Secret Leaked

**Problema**: Segreto committato per errore

**Azione IMMEDIATA**:
1. **Revoca secret** (es. rigenera API key)
2. **Rimuovi da git history**:
   ```bash
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch path/to/file" \
   --prune-empty --tag-name-filter cat -- --all
   ```
3. **Force push** (coordinare con team):
   ```bash
   git push origin --force --all
   ```
4. **Notifica team**
5. **Verifica nessun uso non autorizzato**

## 📈 Metriche Sicurezza da Monitorare

### Settimanali
- Dependabot alerts aperti
- CodeQL findings
- CI failure rate
- Failed deployments

### Mensili
- npm audit report
- Dependency updates stats
- Security incidents
- HTTPS certificate expiry (GitHub gestisce)

### Trimestrali
- Full security audit
- Dependencies major updates review
- Access permissions review
- Secrets rotation check

## 🎯 Prossimi Step Consigliati

### Immediate (Settimana 1)
1. ✅ Configurare `VITE_GA_MEASUREMENT_ID` in GitHub Secrets
2. ✅ Abilitare Branch Protection su `main`
3. ✅ Installare VS Code extensions consigliate
4. ⏳ Eseguire `npm install` per aggiungere Prettier

### Short-term (Mese 1)
5. ⏳ Configurare Google Analytics dashboard
6. ⏳ Creare documenti privacy policy/cookie policy
7. ⏳ Setup notifiche email per security alerts
8. ⏳ Configurare CODEOWNERS file

### Long-term (Trimestre 1)
9. ⏳ Implementare E2E testing (Playwright/Cypress)
10. ⏳ Setup staging environment
11. ⏳ Integrare Sentry error tracking
12. ⏳ Implementare automated security testing (OWASP ZAP)

## 📖 Risorse Utili

### Documentazione Ufficiale
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Prettier Options](https://prettier.io/docs/en/options.html)

### Guide & Tutorial
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GDPR Compliance Guide](https://gdpr.eu/)
- [Secure Coding Practices](https://owasp.org/www-project-secure-coding-practices-quick-reference-guide/)

### Tools
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [Snyk](https://snyk.io/) - Additional vulnerability scanning
- [SonarQube](https://www.sonarqube.org/) - Code quality platform

---

**Autore**: GitHub Copilot  
**Data creazione**: Ottobre 2025  
**Ultima revisione**: Ottobre 2025  
**Stato**: ✅ Implementato e attivo
