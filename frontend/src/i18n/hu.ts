/**
 * Magyar szövegek (alapnyelv). A típusa (Messages) kötelező az angolra is, így onnan sem maradhat ki szöveg.
 * A projektek szövegei a content/projects.ts-ben, az adatvédelmi tájékoztató a pages/Adatvedelem.tsx-ben van.
 */

export const hu = {
  nav: {
    work: "Munkák",
    about: "Rólam",
    stack: "Stack",
    contact: "Kapcsolat",
    cta: "Írj nekem",
    openMenu: "Menü megnyitása",
    closeMenu: "Menü bezárása",
    language: "Nyelv",
    home: "Kezdőlap",
  },
  hero: {
    role: "Full-stack webfejlesztő",
    titleBefore: "Weboldalak és webes rendszerek, a tervtől az ",
    titleAccent: "élesítésig",
    titleAfter: ".",
    lead: "Szántó Dávid vagyok. React frontendet és Node.js backendet építek, biztonságosan és gyorsan, olyan adminfelülettel, amelyet programozói tudás nélkül is lehet kezelni.",
    available: "Elérhető új projektekre",
    primary: "Munkáim",
    secondary: "Kapcsolat",
  },
  work: {
    eyebrow: "01 / Munkák",
    title: "Válogatott munkák",
    lead: "Valódi projektek, valódi ügyfeleknek. Mindegyikhez részletes esettanulmány tartozik.",
    caseStudySoon: "Esettanulmány hamarosan",
    caseStudy: "Esettanulmány",
    screenshotSoon: "Képernyőkép hamarosan",
  },
  about: {
    eyebrow: "02 / Rólam",
    title: "Tiszta kód, átgondolt részletek",
    paragraphs: [
      "Olyan weboldalakat szeretek építeni, amelyek mögött rend van: érthető, karbantartható kód, felesleges bonyolítás nélkül.",
      "A biztonság és az adatvédelem nálam alapértelmezés, nem extra: szerveroldali ellenőrzés, korlátok minden mezőn, sütik és követés csak ott, ahol tényleg kell.",
      "Az oldal nálam akkor kész, ha telefonon, tableten és laptopon is jól működik, és az ügyfél önállóan tudja kezelni.",
    ],
  },
  stack: {
    eyebrow: "03 / Stack",
    title: "Amivel dolgozom",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      ops: "Adatbázis és üzemeltetés",
      quality: "Minőség és tesztelés",
    },
  },
  contact: {
    eyebrow: "04 / Kapcsolat",
    title: "Van egy projekted?",
    lead: "Írd meg röviden, miben segíthetek. Általában egy-két munkanapon belül válaszolok.",
    emailLabel: "E-mail",
    form: {
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
  pageTitles: {
    home: "Szántó Dávid – Full-stack webfejlesztő",
    privacy: "Adatvédelmi tájékoztató – Szántó Dávid",
    notFound: "Az oldal nem található – Szántó Dávid",
  },
};

export type Messages = typeof hu;
