// Astro beállítás: statikus oldalak (build: dist/), React a komponensekhez és szigetekhez, Tailwind 4 a Vite-on át.
// Fejlesztéskor a :5173 porton fut (a backend CORS-a erre van állítva), az /api kéréseket a backend kapja (:3300).
// A SITE_URL (.env) az oldal éles címe: ebből készül a canonical, a megosztási adatok, a sitemap és a robots.txt.
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");
if (!SITE_URL) {
  console.warn("\n[SEO] Nincs SITE_URL a frontend/.env-ben: a canonical és a sitemap localhostra mutat. Élesítés előtt állítsd be!\n");
}

const backendProxy = { "/api": { target: "http://localhost:3300", changeOrigin: true } };

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
  server: { port: 5173 },
  vite: {
    plugins: [tailwindcss()],
    server: { proxy: backendProxy },
    preview: { proxy: backendProxy },
  },
});
