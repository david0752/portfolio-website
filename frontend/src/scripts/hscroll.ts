/**
 * Vízszintes görgetésű sáv (a kezdőlap Munkák blokkja, data-hscroll): nagy képernyőn a blokk megáll a képernyőn
 * (sticky), és a függőleges görgetés a kártyasávot csúsztatja balra. A blokk magassága akkora, hogy a teljes sáv
 * végigcsússzon, utána az oldal megy tovább. Csak lg-től és csökkentett mozgás nélkül; különben az .is-pinned osztály
 * nem kerül fel, és a CSS sima (oldalra görgethető, illetve egymás alatti) elrendezést ad.
 *
 * A csúsztatást, ahol a böngésző tudja (Chrome, Edge, Safari), a CSS végzi görgetéshez kötött animációval
 * (index.css, animation-timeline): ez a görgetéssel egy képkockában mozog, nem késik. Ahol nem tudja (Firefox), ez a
 * script állítja görgetésenként. A script mindkét esetben a távolságot és a blokk magasságát méri.
 * Sima böngészőscript, a Layout.astro tölti be.
 */

const query = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
const cssDriven = CSS.supports("animation-timeline: view()");
const sections = document.querySelectorAll<HTMLElement>("[data-hscroll]");

/*
 * Görgetési hely frissítéskor és Vissza gombnál: a böngésző saját visszaállítása rossz helyre tesz, mert a blokk
 * magassága csak a script mérése után végleges. Ezért ilyen oldalon kézzel állítjuk vissza, a mérés után.
 * A hely a böngésző előzménybejegyzésében (history.state) marad, nem sütiben és nem helyi tárhelyben.
 */
function restoreScroll() {
  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  const saved = (history.state as { scrollY?: number } | null)?.scrollY;
  if ((navigation?.type === "reload" || navigation?.type === "back_forward") && typeof saved === "number") {
    window.scrollTo({ top: saved, behavior: "instant" });
  }
}

if (sections.length > 0) {
  history.scrollRestoration = "manual";
  // Görgetés után kis késleltetéssel mentjük (a lap elhagyásakor a böngésző már nem mindig fogadja el).
  let saveTimer = 0;
  window.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        history.replaceState({ ...(history.state as object | null), scrollY: window.scrollY }, "");
      }, 150);
    },
    { passive: true },
  );
}

for (const section of sections) {
  const track = section.querySelector<HTMLElement>("[data-hscroll-track]");
  const viewport = track?.parentElement;
  if (!track || !viewport) continue;

  // Ennyit kell a sávnak balra csúsznia, hogy az utolsó kártya jobb széle a tartalom jobb széléhez érjen.
  let distance = 0;

  // A sáv jelenlegi eltolása (bármelyik módszer adja), hogy a mérés a kiinduló helyzethez viszonyítson.
  const currentShift = () => new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;

  const update = () => {
    if (cssDriven || !query.matches) return;
    const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / Math.max(distance, 1)));
    track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
  };

  const measure = () => {
    if (!query.matches) {
      section.classList.remove("is-pinned");
      section.style.height = "";
      track.style.transform = "";
      return;
    }
    section.classList.add("is-pinned");
    const last = track.lastElementChild as HTMLElement | null;
    const contentRight = viewport.getBoundingClientRect().right - parseFloat(getComputedStyle(track).paddingRight);
    const trackRight = last ? last.getBoundingClientRect().right - currentShift() : 0;
    distance = Math.max(0, trackRight - contentRight);
    section.style.setProperty("--hscroll-distance", `${distance}px`);
    section.style.height = `${window.innerHeight + distance}px`;
    update();
  };

  // Billentyűzettel egy kártyára lépve az oldal oda görget, ahol a kártya a tartalom bal szélénél áll
  // (különben a sáv rejtett részén maradna). Egérrel kattintva a link is fókuszt kap, de akkor nem szabad
  // görgetni (az oldal elugrana a kattintás alatt), ezért csak a billentyűzetes fókuszra (:focus-visible) fut.
  track.addEventListener("focusin", (event) => {
    const target = event.target as HTMLElement;
    if (!query.matches || distance === 0 || !target.matches(":focus-visible")) return;
    const item = target.closest("li");
    const first = track.firstElementChild as HTMLElement | null;
    if (!item || !first) return;
    viewport.scrollLeft = 0;
    const shift = Math.min(distance, item.offsetLeft - first.offsetLeft);
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: sectionTop + shift, behavior: "instant" });
  });

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", measure);
  query.addEventListener("change", measure);
  // A képek betöltése nem változtat a méreten (a kártyák képaránya rögzített), elég a betűk után mérni.
  measure();
  void document.fonts.ready.then(() => {
    measure();
    restoreScroll();
  });
}
