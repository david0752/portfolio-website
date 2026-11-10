// robots.txt: minden kereső és AI-kereső (GPTBot, ClaudeBot, PerplexityBot stb.) olvashatja az oldalt;
// a sitemap címe a beállított domainből (SITE_URL) készül.
import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("/sitemap-index.xml", site).href;

  return new Response(`User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${sitemap}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
