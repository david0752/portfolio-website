/**
 * A portfólió projektjei, a kezdőlap Munkák blokkja és a projektoldalak (munkak/<slug>) ebből épülnek.
 * Új projekt = új elem a tömbben. Csak valós, jóváhagyott tartalom kerülhet ide (docs/projects/<slug>.md a vázlat).
 */

// Kunmadaras előtte / utána: a régi WordPress-oldal (kunmadarasdrift.hu, 2026. november) és az új oldal kezdőlapja,
// 1536×864 és 390×844 px-es ablakban, kétszeres felbontásban készült képernyőképek (WebP, előre méretezve).
import kdNewDesktop1200 from "../assets/projects/kunmadaras-drift/new-desktop-1200.webp?url";
import kdNewDesktop2400 from "../assets/projects/kunmadaras-drift/new-desktop-2400.webp?url";
import kdNewMobile from "../assets/projects/kunmadaras-drift/new-mobile-780.webp?url";
import kdOldDesktop1200 from "../assets/projects/kunmadaras-drift/old-desktop-1200.webp?url";
import kdOldDesktop2400 from "../assets/projects/kunmadaras-drift/old-desktop-2400.webp?url";
import kdOldMobile from "../assets/projects/kunmadaras-drift/old-mobile-780.webp?url";
// Iskolai projektek képei: a PollakFind az élő oldalról (Info VI → Aula útvonal), az Ügyfélkapu a fejlesztő saját
// bejelentkezésével (Ügyintézés oldal; csak a saját neve és tesztkérelmei látszanak, másoké nem).
import pollakfindImage from "../assets/projects/pollakfind/pollakfind.webp?url";
import ugyfelkapuImage from "../assets/projects/pollak-ugyfelkapu/ugyintezes.webp?url";
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
    image: kdNewDesktop1200,
    comparison: {
      desktop: {
        before: { src: kdOldDesktop1200, srcSet: `${kdOldDesktop1200} 1200w, ${kdOldDesktop2400} 2400w` },
        after: { src: kdNewDesktop1200, srcSet: `${kdNewDesktop1200} 1200w, ${kdNewDesktop2400} 2400w` },
      },
      mobile: { before: { src: kdOldMobile }, after: { src: kdNewMobile } },
    },
    hasCaseStudy: true,
  },
  // Iskolai csapatprojektek (Pollák Antal Technikum). „Az én részem” a fejlesztő commitjaiból, általa jóváhagyva.
  {
    slug: "pollakfind",
    title: "PollakFind",
    year: "2025",
    type: { hu: "Iskolai projekt · webalkalmazás", en: "School project · web app" },
    tagline: { hu: "Teremkereső és útvonaltervező a Pollák épületéhez", en: "Room finder and route planner for the Pollák building" },
    summary: {
      hu: "A Pollák Antal Technikum teremkeresője: megadod, honnan hová mész, és az oldal emeletenként megmutatja az utat, QR-kóddal a telefonodra is.",
      en: "Room finder for Pollák Antal Technical School: pick a start and a destination, and it shows the route floor by floor, with a QR code for your phone.",
    },
    role: { hu: "Frontend-fejlesztés, 6 fős csapatban", en: "Frontend development in a team of six" },
    features: {
      hu: ["teremkereső", "útvonal", "emeletek", "QR-kód", "3D nézet"],
      en: ["room search", "route", "floors", "QR code", "3D view"],
    },
    highlights: {
      hu: [
        "Kezdőpont és célállomás kereséssel, választható termekkel.",
        "Útvonal emeletenként: földszint, 1. és 2. emelet.",
        "QR-kód, hogy az útvonalat a telefonon folytasd.",
        "3D nézet az épületről.",
      ],
      en: [
        "Start point and destination with search and selectable rooms.",
        "Route floor by floor: ground, first and second floor.",
        "A QR code to continue the route on your phone.",
        "A 3D view of the building.",
      ],
    },
    decisions: {
      hu: [
        "Telefonos és laptopos nézet.",
        "A kereső és a választható termek.",
        "Emeletválasztás és a visszaállítás gomb.",
        "TV mód kivetítőre.",
        "A CSS rendezése, a felesleges kód kiszedése.",
      ],
      en: [
        "Phone and laptop layouts.",
        "The search and the selectable rooms.",
        "Floor selection and the reset button.",
        "TV mode for a projector.",
        "Tidying the CSS and removing unused code.",
      ],
    },
    tags: ["React", "JavaScript", "Vite", "Express", "Three.js", "Docker"],
    url: "https://find.pollak.info/",
    repo: "https://github.com/pollak-projektek/pollak-find",
    image: pollakfindImage,
    school: true,
    hasCaseStudy: true,
  },
  {
    slug: "pollak-ugyfelkapu",
    title: "Pollák Ügyfélkapu",
    year: "2026",
    type: { hu: "Iskolai projekt · webalkalmazás", en: "School project · web app" },
    tagline: { hu: "Online ügyintézés a Pollák diákjainak", en: "Online administration for Pollák students" },
    summary: {
      hu: "Az iskola online ügyintéző felülete: a diákok bejelentkezve vagy vendégként adják be a kérelmeiket, az adminok pedig űrlapot állítanak össze minden ügyhöz.",
      en: "The school's online services portal: students submit requests signed in or as guests, and admins build a form for each type of request.",
    },
    role: { hu: "Frontend-fejlesztés, 8 fős csapatban", en: "Frontend development in a team of eight" },
    features: {
      hu: ["kérelmek", "űrlapszerkesztő", "PDF", "értesítések", "jogosultságok"],
      en: ["requests", "form builder", "PDF", "notifications", "permissions"],
    },
    highlights: {
      hu: [
        "Kérelmek (pl. iskolalátogatási, rendkívüli kikérő) állapottal: elfogadva, elutasítva.",
        "Admin űrlapszerkesztő: bekért mezők, határidő, limit diákonként, engedélyezett osztályok.",
        "Elfogadáskor automatikusan csatolt PDF.",
        "Értesítések és jogosultságkezelés.",
      ],
      en: [
        "Requests (e.g. school attendance, special leave) with a status: accepted or rejected.",
        "Admin form builder: requested fields, deadline, limit per student, allowed classes.",
        "A PDF attached automatically on acceptance.",
        "Notifications and permission management.",
      ],
    },
    decisions: {
      hu: [
        "Az ügyintézés és az admin felület reszponzív, telefonos nézete.",
        "Az admin ügykezelés gombjainak átdolgozása.",
        "Az értesítések oldal.",
      ],
      en: ["Responsive phone layout for the requests and admin pages.", "Reworked buttons in the admin request management.", "The notifications page."],
    },
    tags: ["React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    url: "https://ugyfelkapu.pollak.info/",
    image: ugyfelkapuImage,
    school: true,
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
