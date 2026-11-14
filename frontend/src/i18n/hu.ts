/**
 * Magyar szövegek (alapnyelv). A típusa (Messages) kötelező az angolra is, így onnan sem maradhat ki szöveg.
 * A projektek szövegei a content/projects.ts-ben, az adatvédelmi tájékoztató a views/Adatvedelem.tsx-ben van.
 */

export const hu = {
  nav: {
    work: "Munkáim",
    about: "Rólam",
    experience: "Tapasztalat",
    stack: "Technológiák",
    contact: "Kapcsolat",
    cta: "Írj nekem",
    openMenu: "Menü megnyitása",
    closeMenu: "Menü bezárása",
    language: "Nyelv",
    home: "Főoldal",
    // Jobb alsó „vissza a tetejére” gomb (Navbar.tsx).
    backToTop: "Vissza az oldal tetejére",
    skip: "Ugrás a tartalomhoz",
    // Töltőképernyő (Layout.astro), képernyőolvasónak.
    loading: "Az oldal betöltése…",
  },
  hero: {
    role: "Szoftverfejlesztő",
    // A főcím első sora: ez a három szó váltakozik gépelős animációval (scripts/typewriter.ts).
    titleWords: ["Weboldalak", "Webes rendszerek", "Adminfelületek"],
    titleRest: "a tervtől az élesítésig.",
    lead: "Szántó Dávid vagyok, szoftverfejlesztő. React frontendet és Node.js backendet építek, biztonságosan és gyorsan, olyan adminfelülettel, amelyet programozói tudás nélkül is lehet kezelni.",
    available: "Elérhető új projektekre",
    primary: "Munkáim",
    secondary: "Kapcsolat",
  },
  work: {
    eyebrow: "munkáim",
    title: "Projektjeim",
    lead: "Ügyfeleknek épített weboldalak és webes rendszerek.",
    caseStudySoon: "Részletek hamarosan",
    caseStudy: "Esettanulmány",
    // A projektkártya linkje a projektoldalra (ui/ProjectCard.tsx).
    details: "Részletek",
    screenshotSoon: "Képernyőkép hamarosan",
    features: "Funkciók",
    // Projektoldal (views/CaseStudy.tsx)
    allWork: "Összes munka",
    highlights: "kiemelt funkciók",
    decisions: "technikai döntések",
    // Iskolai csapatprojektnél a decisions oszlop címe: mit csináltam a csapatban.
    myPart: "az én részem",
    stack: "stack",
    live: "Élő oldal",
    source: "Forráskód",
    next: "Következő projekt",
    discuss: "Beszéljük meg a projekted",
    // Előtte / utána csúszka egy felújított oldal projektoldalán (ui/BeforeAfter.tsx).
    compare: "előtte és utána",
    compareView: "Nézet",
    compareHint: "Húzd a csúszkát",
    compareSlider: "Előtte és utána: mennyi látszik az új oldalból",
    desktop: "Asztali",
    mobile: "Mobil",
    before: "Előtte",
    after: "Utána",
    beforeAlt: { desktop: "A régi oldal kezdőlapja asztali nézetben", mobile: "A régi oldal kezdőlapja telefonon" },
    afterAlt: { desktop: "Az új oldal kezdőlapja asztali nézetben", mobile: "Az új oldal kezdőlapja telefonon" },
    // A szekció címe melletti link a „Minden projektem” oldalra; csak akkor látszik, ha nem fér ki minden (darabszámmal).
    allLink: "Minden munkám",
    // Projektoldal galériája (ui/Gallery.tsx): a blokk címe, a két csoport (az admin mindig elöl) és a nagyító ablak gombjai.
    screenshots: "képernyőképek",
    shotsAdmin: "Admin felület",
    shotsSite: "Nyilvános oldal",
    shotClose: "Bezárás",
    shotPrev: "Előző kép",
    shotNext: "Következő kép",
    zoomIn: "Nagyítás",
    zoomOut: "Kicsinyítés",
  },
  // Kezdőlap „Iskolai projektek” szekciója (sections/IskolaiProjektek.tsx).
  school: {
    eyebrow: "iskolai projektek",
    title: "Iskolai projektek",
    lead: "Csapatban készült projektek a szentesi Pollák Antal Technikumban.",
    allLink: "Minden iskolai projekt",
  },
  // „Minden projektem” oldal (/munkak/, views/MindenProjekt.tsx): mindkét csoport, külön.
  projects: {
    title: "Minden projektem",
    lead: "Az ügyfeleknek készült munkáim és a Pollákban, csapatban fejlesztett iskolai projektek egy helyen.",
    workTitle: "Munkáim",
  },
  about: {
    eyebrow: "rólam",
    // A szekció címe a fejlesztő fő mondata (a bemutatkozásából), nagy méretben.
    title: "Bonyolult adminisztrációból pár kattintás.",
    // A bemutatkozás bekezdései (a fejlesztő saját szavaiból; a cím mondata itt nem ismétlődik).
    intro: [
      "Szántó Dávid vagyok, Tiszasasról, végzős diák a szentesi Pollák Antal Technikumban. A fejlesztésben az automatizálás vonz a legjobban: olyan megoldásokat szeretek építeni, amelyek leegyszerűsítik mások munkáját.",
      "Motivál a problémák megoldása, és nyitottan, kíváncsian fordulok az új lehetőségek felé.",
    ],
    // A bemutatkozás melletti számok felirata (a darabszám a projektlistából jön); egyes és többes szám.
    facts: {
      client: { one: "ügyfélprojekt", other: "ügyfélprojekt" },
      school: { one: "iskolai csapatprojekt", other: "iskolai csapatprojekt" },
    },
    valuesTitle: "Amire figyelek",
    // A sorrend egyezik a Rolam.tsx ikonjaival (kód, pajzs, kijelzők).
    values: [
      { title: "Tiszta kód", text: "Rendezett, érthető, felesleges bonyolítás nélkül." },
      { title: "Biztonság", text: "Vigyáz a látogatók adataira, felesleges követés nélkül." },
      { title: "Minden képernyőn", text: "Telefonon ugyanolyan jól működik, mint laptopon." },
    ],
  },
  experience: {
    eyebrow: "tapasztalat",
    title: "Tanulás és munka",
    lead: "Tanulmányaim és munkáim, a legfrissebbel kezdve.",
    present: "jelenleg",
  },
  stack: {
    eyebrow: "stack",
    title: "Amivel dolgozom",
    groups: {
      languages: "Nyelvek",
      frontend: "Frontend",
      backend: "Backend",
      ops: "Adatbázis és üzemeltetés",
      tools: "Eszközök és tesztelés",
      ai: "AI",
    },
  },
  contact: {
    eyebrow: "kapcsolat",
    title: "Van egy projekted?",
    lead: "Írd meg röviden, miben segíthetek. Általában egy-két munkanapon belül válaszolok.",
    emailLabel: "E-mail",
    // Másolás gomb a cím mellett (scripts/copy.ts).
    copy: "Másolás",
    copied: "Másolva",
    profilesLabel: "Profilok",
    form: {
      topic: "Miben segíthetek?",
      topicPlaceholder: "Válassz témát",
      topicRequired: "Válaszd ki, milyen ügyben írsz.",
      // A kulcsok a backend utils/validation.ts CONTACT_TOPICS azonosítói.
      topics: {
        "new-site": "Új weboldal",
        "existing-site": "Meglévő oldal fejlesztése, javítása",
        "web-app": "Webes alkalmazás, adminrendszer",
        "site-bug": "Hibát találtam ezen az oldalon",
        other: "Egyéb",
      },
      name: "Név",
      email: "E-mail-cím",
      message: "Üzenet",
      messagePlaceholder: "Milyen oldalt szeretnél, és mire lenne szükséged?",
      submit: "Üzenet küldése",
      sending: "Küldés…",
      success: "Köszönöm, megkaptam az üzenetedet! Hamarosan válaszolok.",
      genericError: "Nem sikerült elküldeni az üzenetet. Próbáld újra később, vagy írj e-mailt.",
      privacyBefore: "Az üzenet elküldésével elfogadod az ",
      privacyLink: "adatvédelmi tájékoztatót",
      privacyAfter: ".",
    },
  },
  footer: {
    rights: "Minden jog fenntartva.",
    privacy: "Adatvédelem",
  },
  notFound: {
    code: "404",
    title: "Ez az oldal nem található",
    lead: "Lehet, hogy elírás van a címben, vagy az oldal már nem létezik.",
    back: "Vissza a kezdőlapra",
  },
  // Keresőknek és megosztott linkeknek (meta description), oldalanként.
  descriptions: {
    home: "Szántó Dávid szoftverfejlesztő: weboldalak és webes rendszerek a tervtől az élesítésig, React és Node.js alapon, könnyen kezelhető adminfelülettel.",
    privacy: "Hogyan kezelem a kapcsolati űrlapon megadott adatokat.",
    projects: "Szántó Dávid összes projektje: ügyfeleknek készült weboldalak és webes rendszerek, valamint iskolai csapatprojektek.",
  },
  pageTitles: {
    // Legfeljebb kb. 60 karakter, különben a Google levágja.
    home: "Szántó Dávid – Szoftverfejlesztő | Weboldalak, webrendszerek",
    privacy: "Adatvédelmi tájékoztató – Szántó Dávid",
    projects: "Minden projektem – Szántó Dávid",
    notFound: "Az oldal nem található – Szántó Dávid",
  },
};

export type Messages = typeof hu;
