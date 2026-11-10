/**
 * Görgetési beúszás mindkét irányban: amikor egy data-reveal elem a képernyőre ér, megkapja az .is-visible
 * osztályt; amikor elhagyja, elveszti, így visszagörgetéskor újra beúszik. A data-from jelzi, melyik oldalon
 * hagyta el a képernyőt (top / bottom), hogy onnan érkezzen vissza: lefelé görgetve alulról, felfelé felülről.
 * Az animáció az index.css-ben van (csak nagy képernyőn és csökkentett mozgás nélkül).
 * Sima böngészőscript, a Layout.astro tölti be.
 */

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      const el = entry.target as HTMLElement;
      if (!entry.isIntersecting) el.dataset.from = entry.boundingClientRect.top < 0 ? "top" : "bottom";
      el.classList.toggle("is-visible", entry.isIntersecting);
    }
  },
  // Alul kicsit beljebb indul a beúszás, hogy látszódjon; felül pontosan a képernyő szélénél.
  { rootMargin: "0px 0px -10% 0px" },
);

for (const el of document.querySelectorAll("[data-reveal]")) observer.observe(el);
