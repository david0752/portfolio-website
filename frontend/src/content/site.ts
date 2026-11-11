/**
 * A tulajdonos alapadatai egy helyen: név, hely, közösségi profilok, technológiák. Ebből dolgozik a hero
 * kódablaka, a Stack és a Kapcsolat blokk, a lábléc, a keresőknek szóló strukturált adat (JSON-LD) és az llms.txt.
 * Csak valós adat kerülhet ide.
 */

import type { Lang } from "../i18n/index.ts";
import type { Project } from "../types/project.ts";

export const OWNER = {
  name: { hu: "Szántó Dávid", en: "Dávid Szántó" } satisfies Record<Lang, string>,
  locality: "Tiszasas",
  country: { hu: "Magyarország", en: "Hungary" } satisfies Record<Lang, string>,
  countryCode: "HU",
} as const;

// Ennek a portfóliónak a nyilvános forráskódja (a Rólam „Tiszta kód” elvének bizonyítéka).
export const SITE_REPO = "https://github.com/david0752/portfolio-website";

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

/**
 * Strukturált adat a „Minden projektem” oldalra: gyűjtőoldal a projektoldalak listájával (szerző a kezdőlap
 * Person-je), és a morzsamenü (kezdőlap → oldal).
 */
export function projectsJsonLd(lang: Lang, site: URL, pageUrl: string, name: string, projectUrls: string[]) {
  const home = new URL(lang === "hu" ? "/" : "/en/", site).href;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name,
        url: pageUrl,
        inLanguage: lang,
        isPartOf: { "@id": new URL("/#website", site).href },
        author: { "@id": new URL("/#person", site).href },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projectUrls.map((url, index) => ({ "@type": "ListItem", position: index + 1, url })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: OWNER.name[lang], item: home },
          { "@type": "ListItem", position: 2, name, item: pageUrl },
        ],
      },
    ],
  };
}

/**
 * Strukturált adat egy projektoldalra: a munka (szerző a kezdőlap Person-je, ugyanazzal az @id-val) és a
 * morzsamenü (kezdőlap → projekt), hogy a keresők a portfólió részeként értsék.
 */
export function caseStudyJsonLd(lang: Lang, site: URL, pageUrl: string, project: Project, homeName: string) {
  const home = new URL(lang === "hu" ? "/" : "/en/", site).href;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: project.title,
        headline: project.tagline[lang],
        description: project.summary[lang],
        url: pageUrl,
        inLanguage: lang,
        dateCreated: project.year,
        keywords: project.tags.join(", "),
        author: { "@id": new URL("/#person", site).href },
        isPartOf: { "@id": new URL("/#website", site).href },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: homeName, item: home },
          { "@type": "ListItem", position: 2, name: project.title, item: pageUrl },
        ],
      },
    ],
  };
}
