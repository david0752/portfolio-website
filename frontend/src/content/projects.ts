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
      hu: "Egy driftverseny-sorozat új weboldala és adminrendszere, egy régi WordPress-oldal helyére. A nézők megtalálják a következő eseményt, a pilóták online neveznek, a szervező pedig programozói tudás nélkül, egyedül kezel mindent.",
      en: "The new website and admin system of a drift event series, replacing an old WordPress site. Spectators find the next event, pilots register online, and the organizer runs everything alone without any coding skills.",
    },
    role: { hu: "Tervezés és fejlesztés", en: "Design and development" },
    features: {
      hu: ["eseménynaptár", "pilótanevezés", "eredmények", "galéria", "hírlevél", "admin"],
      en: ["event calendar", "pilot registration", "results", "gallery", "newsletter", "admin"],
    },
    highlights: {
      hu: [
        "Nyilvános oldal eseménynaptárral, programokkal, eredményekkel, galériával, kapcsolati űrlappal és hírlevéllel.",
        "Pilótanevezés eseményenként: opciók díjakkal, kategóriák, létszámkorlát és határidő; a szervező elfogadja vagy elutasítja, az indoklás e-mailben megy.",
        "Admin egy nem technikai szervezőnek: események programmal és piszkozattal, nevezések, eredmények, galéria, GYIK, sablonos hírlevél háttérküldéssel, statisztika.",
        "Magyar és angol nyelv, az adminban írt tartalom automatikus fordításával (DeepL); világos és sötét téma.",
      ],
      en: [
        "Public site with event calendar, programs, results, gallery, contact form and newsletter.",
        "Pilot registration per event: options with fees, categories, capacity and deadline; the organizer accepts or rejects, and the reason goes out by e-mail.",
        "Admin for a non-technical organizer: events with schedules and drafts, registrations, results, gallery, FAQ, template-based newsletter sent in the background, statistics.",
        "Hungarian and English, with content written in the admin translated automatically (DeepL); light and dark theme.",
      ],
    },
    decisions: {
      hu: [
        "Biztonság alapból: bcrypt jelszavak, JWT httpOnly sütiben CSRF-védelemmel, szerepkör-ellenőrzés minden kérésnél, szerveroldali validáció és limit minden mezőn.",
        "Adatvédelem: sütik nélkül, sütimentes névtelen statisztikával; YouTube és térkép csak hozzájárulás után, saját szerverről töltött betűk.",
        "Egy 2 GB-os szerverre méretezve: feltöltéskor WebP-re alakított képek, kevés memóriát használó képfeldolgozás, korlát minden növekvő listán.",
        "A mainál jóval több adattal tesztelve: terhelési szimuláció, egységtesztek a biztonságkritikus részekre és Playwright végponttól végpontig tesztek.",
      ],
      en: [
        "Security by default: bcrypt passwords, JWT in an httpOnly cookie with CSRF protection, role checks on every request, server-side validation and limits on every field.",
        "Privacy: no cookies, cookie-free anonymous statistics; YouTube and maps only after consent, self-hosted fonts.",
        "Sized for a 2 GB server: images converted to WebP on upload, low-memory image processing, limits on every list that can grow.",
        "Tested with far more data than exists today: a load simulation, unit tests for the security-critical parts and Playwright end-to-end tests.",
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
