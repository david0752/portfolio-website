/**
 * A portfólió projektjei, a kezdőlap Munkák blokkja és a projektoldalak (munkak/<slug>) ebből épülnek.
 * Új projekt = új elem a tömbben. Csak valós, jóváhagyott tartalom kerülhet ide (docs/projects/<slug>.md a vázlat).
 */

import type { Project } from "../types/project.ts";

export const projects: Project[] = [
  {
    slug: "kunmadaras-drift",
    title: "Kunmadaras Drift",
    year: "2026",
    type: { hu: "Weboldal + adminrendszer", en: "Website + admin system" },
    tagline: { hu: "Driftverseny-sorozat weboldala és adminja", en: "Website and admin for a drift event series" },
    summary: {
      // A keresőkben ez a projektoldal leírása is, ezért legfeljebb kb. 155 karakter.
      hu: "A régi WordPress-oldal helyére készült: a nézők gyorsan megtalálják az eseményeket, a pilóták online neveznek, a szervező programozás nélkül kezel mindent.",
      en: "Built to replace an old WordPress site: spectators quickly find the events, pilots register online, and the organizer runs everything without coding.",
    },
    role: { hu: "Tervezés és fejlesztés", en: "Design and development" },
    features: {
      hu: ["eseménynaptár", "pilótanevezés", "eredmények", "galéria", "hírlevél", "admin"],
      en: ["event calendar", "pilot registration", "results", "gallery", "newsletter", "admin"],
    },
    highlights: {
      hu: [
        "Eseménynaptár, programok, eredmények, galéria, kapcsolati űrlap és hírlevél.",
        "Online nevezés díjakkal, kategóriákkal, létszámkorláttal és határidővel; a döntésről a pilóta e-mailt kap.",
        "Egyszerű admin a szervezőnek: minden tartalom, a nevezések és a hírlevél egy helyen, statisztikával.",
        "Magyar és angol nyelv automatikus fordítással (DeepL), világos és sötét téma.",
      ],
      en: [
        "Event calendar, programs, results, gallery, contact form and newsletter.",
        "Online registration with fees, categories, capacity and deadline; pilots get the decision by e-mail.",
        "A simple admin for the organizer: all content, registrations and the newsletter in one place, with statistics.",
        "Hungarian and English with automatic translation (DeepL), light and dark theme.",
      ],
    },
    decisions: {
      hu: [
        "Biztonság: bcrypt jelszavak, JWT httpOnly sütiben CSRF-védelemmel, szerveroldali ellenőrzés és limit minden mezőn.",
        "Adatvédelem: sütimentes, névtelen statisztika; YouTube és térkép csak hozzájárulás után.",
        "Kis, 2 GB-os szerverre méretezve: WebP képek, takarékos memóriahasználat, korlát a növekvő listákon.",
        "Minőség: terhelési szimuláció a mainál jóval több adattal, egység- és Playwright E2E tesztek.",
      ],
      en: [
        "Security: bcrypt passwords, JWT in an httpOnly cookie with CSRF protection, server-side validation and limits on every field.",
        "Privacy: cookie-free anonymous statistics; YouTube and maps only after consent.",
        "Sized for a small 2 GB server: WebP images, low memory use, limits on growing lists.",
        "Quality: a load simulation with far more data than today, plus unit and Playwright E2E tests.",
      ],
    },
    tags: ["React", "TypeScript", "Tailwind CSS", "Express", "PostgreSQL"],
    status: { hu: "Funkcionálisan kész, élesítés előtt", en: "Functionally complete, launch pending" },
    hasCaseStudy: true,
  },
];

/**
 * Az oldalon megjelenő projektek: élesben csak a fenti valódiak, fejlesztői módban a példakártyák is
 * (content/sampleProjects.ts). A dinamikus import miatt a példák és a képeik élesben a buildbe sem kerülnek be.
 */
export async function allProjects(): Promise<Project[]> {
  if (!import.meta.env.DEV) return projects;
  const { sampleProjects } = await import("./sampleProjects.ts");
  return [...projects, ...sampleProjects];
}

// A saját oldallal rendelkező projektek (ezekhez készül munkak/<slug> oldal, sorrendben).
export async function caseStudies(): Promise<Project[]> {
  return (await allProjects()).filter((project) => project.hasCaseStudy);
}
