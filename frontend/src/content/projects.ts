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
// Iskolai projekt képe: a PollakFind az élő oldalról (Info VI → Aula útvonal).
import pollakfindImage from "../assets/projects/pollakfind/pollakfind.webp?url";
import type { Lang } from "../i18n/index.ts";
import type { Project, Screenshot } from "../types/project.ts";

// Legfeljebb ennyi galériakép lehet projektenként; ha több, a build hibával megáll.
export const SCREENSHOT_LIMIT = 12;

// A galériaképek (assets/projects/<slug>/admin-*.webp és site-*.webp) URL-jei, méretenként külön fájlban
// (pl. admin-stats-800.webp, admin-stats-2400.webp). Kunmadaras: bemutató adatbázisból, kitalált nevekkel;
// PollakFind: az élő oldalról.
const shotFiles = import.meta.glob<string>("../assets/projects/*/{admin,site}-*.webp", { eager: true, query: "?url", import: "default" });

// Galériakép a „<slug>/<név>” fájlcsaládból: a legkisebb méret a src, mind a srcSet-ben. Elírt név = buildhiba.
function screenshot(name: string, caption: Record<Lang, string>, admin = false): Screenshot {
  const sizes = Object.entries(shotFiles)
    .map(([file, url]) => ({ url, width: Number(file.match(new RegExp(`/${name}-(\\d+)\\.webp$`))?.[1]) }))
    .filter((size) => size.width)
    .sort((a, b) => a.width - b.width);
  if (!sizes.length) throw new Error(`Hiányzó galériakép: assets/projects/${name}-<szélesség>.webp`);
  return { src: sizes[0].url, srcSet: sizes.map((size) => `${size.url} ${size.width}w`).join(", "), caption, admin };
}

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
    screenshots: [
      screenshot("kunmadaras-drift/admin-stats", { hu: "Statisztika: látogatók és legnézettebb oldalak", en: "Statistics: visitors and most viewed pages" }, true),
      screenshot("kunmadaras-drift/admin-registration", { hu: "Egy nevezés elfogadása vagy elutasítása", en: "Accepting or rejecting a registration" }, true),
      screenshot("kunmadaras-drift/admin-event-editor", { hu: "Esemény szerkesztése plakáttal", en: "Editing an event with its poster" }, true),
      screenshot("kunmadaras-drift/admin-results", { hu: "Eredmények kategóriánként, limitekkel", en: "Results by category, with limits" }, true),
      screenshot("kunmadaras-drift/admin-newsletter", { hu: "Hírlevél sablonból, automatikus küldéssel", en: "Newsletter from a template, with automatic sending" }, true),
      screenshot("kunmadaras-drift/admin-gallery", { hu: "Galéria versenyzőnként, fotólimittel", en: "Gallery per driver, with a photo limit" }, true),
      screenshot("kunmadaras-drift/site-programs", { hu: "Programok: a következő esemény", en: "Events: the next event" }),
      screenshot("kunmadaras-drift/site-results", { hu: "Versenyeredmények dobogóval", en: "Results with podiums" }),
      screenshot("kunmadaras-drift/site-registration", { hu: "Online nevezési űrlap", en: "Online registration form" }),
    ],
    screenshotNote: {
      hu: "A képek bemutató adatokkal készültek, a nevek kitaláltak.",
      en: "The screenshots use demo data; the names are made up.",
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
    // A 2D útvonal már a projekt fő képe, ezért a galériában csak a 3D nézet szerepel.
    screenshots: [screenshot("pollakfind/site-3d", { hu: "Az útvonal 3D nézetben", en: "The route in 3D view" })],
    school: true,
    hasCaseStudy: true,
  },
];

for (const project of projects) {
  const count = project.screenshots?.length ?? 0;
  if (count > SCREENSHOT_LIMIT) throw new Error(`Legfeljebb ${SCREENSHOT_LIMIT} galériakép lehet projektenként, a(z) ${project.slug} projektnél ${count} van`);
}

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
