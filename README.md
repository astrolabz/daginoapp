# Dagino App

Static SPA for Ristorante Da Gino built with React + Vite + Tailwind.

## Local development
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`

Reservation API (optional PoC)
- A minimal Express + SQLite PoC backend is included in `services/reservation-api`.
- To run locally:
	- cd services/reservation-api
	- npm install
	- npm run dev
	- The service listens on port 3001 by default.
- To have the frontend use the API, set an environment variable before starting the frontend:
	- PowerShell:
		$env:VITE_RESERVATION_API_URL = "http://localhost:3001"
	- Then run the frontend dev server as usual.

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
