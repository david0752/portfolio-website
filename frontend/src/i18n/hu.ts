/**
 * Magyar szövegek (alapnyelv). A típusa (Messages) kötelező az angolra is, így onnan sem maradhat ki szöveg.
 * A projektek szövegei a content/projects.ts-ben, az adatvédelmi tájékoztató a pages/Adatvedelem.tsx-ben van.
 */

export const hu = {
  nav: {
    work: "Munkáim",
    about: "Rólam",
    experience: "Tapasztalat",
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
    title: "Amire figyelek",
    // A sorrend egyezik a Rolam.tsx ikonjaival (kód, pajzs, kijelzők).
    values: [
      { title: "Tiszta kód", text: "Rendezett, érthető, felesleges bonyolítás nélkül." },
      { title: "Biztonság", text: "Vigyáz a látogatók adataira, felesleges követés nélkül." },
      { title: "Minden képernyőn", text: "Telefonon ugyanolyan jól működik, mint laptopon." },
    ],
  },
  experience: {
    eyebrow: "03 / Tapasztalat",
    title: "Tanulás és munka",
    lead: "Tanulmányaim és munkáim, a legfrissebbel kezdve.",
    present: "jelenleg",
  },
  stack: {
    eyebrow: "04 / Stack",
    title: "Amivel dolgozom",
    groups: {
      frontend: "Frontend",
      backend: "Backend",
      ops: "Adatbázis és üzemeltetés",
    },
  },
  contact: {
    eyebrow: "05 / Kapcsolat",
    title: "Van egy projekted?",
    lead: "Írd meg röviden, miben segíthetek. Általában egy-két munkanapon belül válaszolok.",
    emailLabel: "E-mail",
    form: {
      topic: "Miben segíthetek?",
      topicPlaceholder: "Válassz témát",
      // A kulcsok a backend utils/validation.ts CONTACT_TOPICS azonosítói.
      topics: {
        "new-site": "Új weboldal",
        "existing-site": "Meglévő oldal fejlesztése, javítása",
        "web-app": "Webes alkalmazás, adminrendszer",
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
  pageTitles: {
    home: "Szántó Dávid – Full-stack webfejlesztő",
    privacy: "Adatvédelmi tájékoztató – Szántó Dávid",
    notFound: "Az oldal nem található – Szántó Dávid",
  },
};

export type Messages = typeof hu;
