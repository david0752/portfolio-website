/**
 * Az egér helyét CSS-változókba (--mx, --my) írja minden data-pointer jelölésű elemen; a hero rács és a
 * kártyák egérkövető fénye (index.css) ebből dolgozik. Sima böngészőscript (Layout.astro tölti be), nem kell
 * hozzá React. Csak egérre, így érintésnél nincs felesleges munka.
 */

for (const el of document.querySelectorAll<HTMLElement>("[data-pointer]")) {
  el.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
}
