# Dagino App

Static SPA for Ristorante Da Gino built with React + Vite + Tailwind.

## Local development

- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`

## Reservations

- Online bookings are now handled entirely via the official TheFork widget embedded in the frontend.
- The legacy Express/SQLite proof-of-concept in `services/reservation-api` has been retired and kept only as an empty placeholder for historical reference.

## Prenotazioni (Google)

Sistema di prenotazioni completamente gratuito basato su Google Forms + Google Sheets + Apps Script + Google Calendar.

Per configurare il sistema di prenotazioni, segui la guida completa: [docs/GOOGLE_BOOKING_SETUP.md](docs/GOOGLE_BOOKING_SETUP.md)

## Deployment (GitHub Pages)

- CI is configured in `.github/workflows/deploy.yml`.
- On push to `main`, the site is built and deployed to GitHub Pages.

- ### Custom domain
- Canonical domain: `www.ristorantedagino.nl`
- `public/CNAME` contains the custom domain and will be deployed automatically.
- DNS:
  - CNAME: `www` -> `astrolabz.github.io`
  - A records for apex `ristorantedagino.nl` -> 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
- After the first deploy, in GitHub → Settings → Pages, set Custom domain to `ristorantedagino.nl` and enable “Enforce HTTPS”.
  - In Settings → Pages set Custom domain to `www.ristorantedagino.nl` (recommended) and enable “Enforce HTTPS”.

### DNS (GoDaddy)

For apex (root) domain on GitHub Pages, add A records:

- @ → 185.199.108.153
- @ → 185.199.109.153
- @ → 185.199.110.153
- @ → 185.199.111.153

Optionally add a CAA record to allow Let’s Encrypt certificates:

- type: CAA, name: @, value: 0 issue "letsencrypt.org"

If you want `www`, add CNAME:

- host: `www` → `astrolabz.github.io`

---

## Security

✅ **Repository Status**: Clean and secure - no credentials or sensitive information found.

This project implements multiple security measures:

- 🔒 **Dependabot**: Automated dependency vulnerability scanning
- 🛡️ **Security Scanning**: ESLint, NPM Audit, Trivy, Gitleaks
- 🔐 **Secret Management**: Environment variables via GitHub Secrets
- 📝 **Code Quality**: ESLint + Prettier with security rules

**Note**: CodeQL is not available for free on private repositories. We use free alternatives instead.

For detailed information about security workflows and alternatives, see [docs/SECURITY_ALTERNATIVES.md](docs/SECURITY_ALTERNATIVES.md)

---

MIT License

## Cleanup build/runtime artifacts

If your working tree contains generated build artifacts or runtime PID files that pollute the repo, there's a helper script to remove them locally (it preserves package-lock.json):

PowerShell:

```powershell
cd <repo-root>
./scripts/clean-artifacts.ps1
```

This will attempt to remove `dist/`, `pids/`, `node_modules/` and `package-lock.json` from your working copy (local only). `.gitignore` has been updated to prevent re-adding these files.
This removes `dist/`, `pids/`, and `node_modules/` only. The lockfile (`package-lock.json`) is preserved for reproducible installs.
