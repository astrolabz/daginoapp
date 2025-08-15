# Dagino App

Static SPA for Ristorante Da Gino built with React + Vite + Tailwind.

## Local development
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Build: `npm run build`

## Deployment (GitHub Pages)
- CI is configured in `.github/workflows/deploy.yml`.
- On push to `main`, the site is built and deployed to GitHub Pages.

### Custom domain
- Domain: `ristorantedagino.nl`
- `public/CNAME` contains the custom domain and will be deployed automatically.
- After the first deploy, in GitHub → Settings → Pages, set Custom domain to `ristorantedagino.nl` and enable “Enforce HTTPS”.

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
