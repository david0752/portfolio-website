/**
 * Magyar szövegek (alapnyelv). A típusa (Messages) kötelező az angolra is, így onnan sem maradhat ki szöveg.
 * A projektek szövegei a content/projects.ts-ben, az adatvédelmi tájékoztató a components/Adatvedelem.tsx-ben van.
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
    // A főcím első sora: ez a három szó váltakozik gépelős animációval (utils/typewriter.ts).
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
    lead: "Valódi projektek, valódi ügyfeleknek. Mindegyikhez részletes esettanulmány tartozik.",
    caseStudySoon: "Esettanulmány hamarosan",
    caseStudy: "Esettanulmány",
    screenshotSoon: "Képernyőkép hamarosan",
    features: "Funkciók",
    // Projektoldal (components/CaseStudy.tsx)
    allWork: "Összes munka",
    highlights: "kiemelt funkciók",
    decisions: "technikai döntések",
    stack: "stack",
    live: "Élő oldal",
    source: "Forráskód",
    next: "Következő projekt",
    discuss: "Beszéljük meg a projekted",
  },
  about: {
    eyebrow: "rólam",
    title: "Pár szó rólam",
    // A bemutatkozás bekezdései (a fejlesztő saját szavaiból).
    intro: [
      "Szántó Dávid vagyok, Tiszasasról, végzős diák a szentesi Pollák Antal Technikumban. A fejlesztésben az automatizálás vonz a legjobban: olyan megoldásokat szeretek építeni, amelyek leegyszerűsítik mások munkáját, és egy bonyolult adminisztrációt pár kattintássá tesznek.",
      "A problémamegoldás hajt, kíváncsian próbálok ki új dolgokat, és ambiciózus vagyok: minden projekttel egy lépéssel előrébb akarok jutni.",
    ],
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
    // Másolás gomb a cím mellett (utils/copy.ts).
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
  },
  pageTitles: {
    // Legfeljebb kb. 60 karakter, különben a Google levágja.
    home: "Szántó Dávid – Szoftverfejlesztő | Weboldalak, webrendszerek",
    privacy: "Adatvédelmi tájékoztató – Szántó Dávid",
    notFound: "Az oldal nem található – Szántó Dávid",
  },
};

export type Messages = typeof hu;
