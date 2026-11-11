/**
 * Az oldal nyelvei (magyar, angol) és az útvonalaik. A nyelvet az URL adja: magyar a gyökérben (/),
 * angol az /en/ alatt, így mindkét nyelv külön, indexelhető oldal. Semmit nem tárolunk a böngészőben.
 *
 *   const t = messages(lang);   const p = paths(lang);   <a href={p.privacy}>
 */

import { en } from "./en.ts";
import { hu, type Messages } from "./hu.ts";

export type Lang = "hu" | "en";

export const LANGUAGES: { code: Lang; short: string; name: string }[] = [
  { code: "hu", short: "HU", name: "Magyar" },
  { code: "en", short: "EN", name: "English" },
];

const MESSAGES: Record<Lang, Messages> = { hu, en };

export function messages(lang: Lang): Messages {
  return MESSAGES[lang];
}

// Útvonalak nyelvenként; az angol oldalak angol nevet kapnak. Mindig perjelre végződnek (astro.config: trailingSlash),
// így a canonical cím és a tényleges cím egyezik, nincs átirányítás.
const PATHS = {
  hu: { home: "/", privacy: "/adatvedelem/", work: "/munkak" },
  en: { home: "/en/", privacy: "/en/privacy/", work: "/en/work" },
} as const;

export function paths(lang: Lang) {
  const p = PATHS[lang];
  // projects: a „Minden projektem” oldal (/munkak/, /en/work/).
  return { home: p.home, privacy: p.privacy, projects: `${p.work}/`, project: (slug: string) => `${p.work}/${slug}/` };
}
