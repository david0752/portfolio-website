# Portfolio website

Personal portfolio of Dávid Szántó (Szántó Dávid), software developer – in Hungarian and English, with project case studies.

## Stack

- **Frontend** (`frontend/`): Astro (static output) + React 19, TypeScript, Tailwind CSS 4. Hungarian at `/`, English at `/en/`.
- **Backend** (`backend/`): Express + TypeScript, a single endpoint for the contact form (sends the message by e-mail).

No cookies, no tracking, self-hosted fonts.

## Running locally

```bash
# backend (http://localhost:3300)
cd backend
cp .env.example .env   # fill in the SMTP settings
npm install
npm run dev

# frontend (http://localhost:5173, /api is proxied to the backend)
cd frontend
cp .env.example .env   # SITE_URL: the public address, needed for production builds
npm install
npm run dev
```

Production build: `npm run build` in `frontend/` (output in `frontend/dist/`), and `npm run build` + `npm start` in `backend/`. Backend tests: `npm test`.
