# Portfolio website

Personal portfolio of Dávid Szántó (Szántó Dávid), software developer – in Hungarian and English, with project case studies.

## Stack

- **Frontend** (`frontend/`): Astro (static output) + React 19, TypeScript, Tailwind CSS 4. Hungarian at `/`, English at `/en/`.
- **Backend** (`backend/`): Cloudflare Worker + TypeScript, a single endpoint for the contact form (sends the message by e-mail). The same Worker serves the built site at https://szdavid.dev.

No cookies, no tracking, self-hosted fonts.

## Running locally

```bash
# frontend (http://localhost:5173)
cd frontend
npm install
npm run dev

# backend: the Cloudflare Worker with the contact form API (http://localhost:3300)
# the frontend dev server proxies /api here; sent mails are only simulated locally
cd backend
npm install
npm run dev
```

The production address (`SITE_URL`) is set in `frontend/.env.production`.

## Deployment

Cloudflare Workers builds and deploys the `release` branch automatically: it builds `frontend/` into `frontend/dist`, and `wrangler deploy` (config: `backend/wrangler.jsonc`) publishes the static site together with the `/api/contact` Worker. Tests: `npm test` in `backend/`.
