/**
 * A tulajdonos alapadatai egy helyen: név, hely, közösségi profilok, technológiák. Ebből dolgozik a hero
 * kódablaka, a Stack és a Kapcsolat blokk, a lábléc, a keresőknek szóló strukturált adat (JSON-LD) és az llms.txt.
 * Csak valós adat kerülhet ide.
 */

import type { Lang } from "../i18n/index.ts";

export const OWNER = {
  name: { hu: "Szántó Dávid", en: "Dávid Szántó" } satisfies Record<Lang, string>,
  locality: "Tiszasas",
  country: { hu: "Magyarország", en: "Hungary" } satisfies Record<Lang, string>,
  countryCode: "HU",
} as const;

export const PROFILES = [
  { id: "github", label: "GitHub", url: "https://github.com/david0752" },
  { id: "instagram", label: "Instagram", url: "https://www.instagram.com/sz_david3/" },
  { id: "facebook", label: "Facebook", url: "https://www.facebook.com/david.szanto.984/" },
] as const;

// A Stack blokk csoportjai; a strukturált adat „knowsAbout” mezője is ebből készül.
// Csak olyan technológia szerepelhet itt, amit a fejlesztő a saját projektjeiben tényleg használ.
export const STACK = {
  languages: ["TypeScript", "JavaScript", "Python", "HTML", "CSS"],
  frontend: ["React", "Astro", "Tailwind CSS", "Vite"],
  backend: ["Node.js", "Express", "REST API"],
  ops: ["PostgreSQL", "MySQL", "Linux VPS", "nginx", "Cloudflare"],
  tools: ["Git", "GitHub", "Vitest"],
  ai: ["Claude", "ChatGPT"],
} as const;

export const ALL_TECH = Object.values(STACK).flat();

/**
 * Strukturált adat (JSON-LD) a kezdőlapra: ki a tulajdonos, mivel foglalkozik, hol él, mely profilok az övéi.
 * Ebből értik meg a keresők és az AI-keresők, hogy az oldal és a közösségi profilok ugyanahhoz a személyhez tartoznak.
 */
export function profileJsonLd(lang: Lang, site: URL, pageUrl: string, jobTitle: string, description: string) {
  const personId = new URL("/#person", site).href;
  const websiteId = new URL("/#website", site).href;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: site.href,
        name: OWNER.name[lang],
        inLanguage: ["hu", "en"],
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        url: pageUrl,
        inLanguage: lang,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: OWNER.name[lang],
        alternateName: OWNER.name[lang === "hu" ? "en" : "hu"],
        url: site.href,
        jobTitle,
        description,
        address: { "@type": "PostalAddress", addressLocality: OWNER.locality, addressCountry: OWNER.countryCode },
        knowsAbout: ALL_TECH,
        knowsLanguage: ["hu", "en"],
        sameAs: PROFILES.map((profile) => profile.url),
      },
    ],
  };
}
