// Astro beállítás: statikus oldalak (build: dist/), React a komponensekhez és szigetekhez, Tailwind 4 a Vite-on át.
// Fejlesztéskor a :5173 porton fut, az /api kéréseket a backend (Cloudflare Worker, wrangler dev) kapja a :3300-as porton.
// A SITE_URL (.env.production) az oldal éles címe: ebből készül a canonical, a megosztási adatok, a sitemap és a robots.txt.
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

// Mindig az éles beállítást olvassa (fejlesztéskor is), így a canonical és a sitemap mindenhol az éles címre mutat.
const { SITE_URL } = loadEnv("production", process.cwd(), "");
if (!SITE_URL) {
  console.warn("\n[SEO] Nincs SITE_URL a frontend/.env.production-ben: a canonical és a sitemap localhostra mutat.\n");
}

// A Worker csak a saját címéről fogadja az űrlapot (Origin-ellenőrzés), ezért a proxy az Origin fejlécet is átírja.
const backendProxy = {
  "/api": { target: "http://localhost:3300", changeOrigin: true, headers: { origin: "http://localhost:3300" } },
};

export default defineConfig({
  site: SITE_URL || "http://localhost:5173",
  // Minden cím perjelre végződik, így egy oldalnak egyetlen címe van (nincs duplikált tartalom a keresőben).
  trailingSlash: "always",
  integrations: [
    react(),
    sitemap({
      // A 404-es oldalak nem valók a sitemapbe.
      filter: (page) => !page.includes("/404"),
      // A magyar és az angol oldalpárok összekötése (hreflang a sitemapben is).
      i18n: { defaultLocale: "hu", locales: { hu: "hu", en: "en" } },
    }),
  ],
  // Content-Security-Policy: az Astro minden oldal head-jébe meta tagként teszi, a saját scriptjei és stílusai
  // hash-ével. Csak a saját domainről tölthet be bármit (nincs külső szkript, betűtípus vagy beágyazás).
  // A style attribútumok (React style={...}) engedélyezve, mert azokat hash nem fedi le; szkriptet nem futtatnak.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      styleDirective: { resources: ["'self'", { resource: "'unsafe-inline'", kind: "attribute" }] },
    },
  },
  server: { port: 5173 },
  vite: {
    plugins: [tailwindcss()],
    // A .trycloudflare.com engedély a Cloudflare gyors alagúthoz kell (helyi oldal megmutatása másnak).
    server: { proxy: backendProxy, allowedHosts: [".trycloudflare.com"] },
    preview: { proxy: backendProxy },
  },
});
