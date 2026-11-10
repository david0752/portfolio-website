/**
 * Másolás gombok: a data-copy szövegét a vágólapra teszi, és két másodpercre a data-copied feliratra vált
 * (pl. „Másolva”). A gomb alapból rejtett (hidden), ez a script teszi láthatóvá, mert JavaScript nélkül nem működne.
 * Sima böngészőscript, a Layout.astro tölti be.
 */

for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
  // A vágólap csak biztonságos kapcsolaton (https, localhost) érhető el; ahol nincs, a gomb rejtve marad.
  if (!navigator.clipboard) continue;
  button.hidden = false;
  const label = button.textContent;

  button.addEventListener("click", () => {
    navigator.clipboard.writeText(button.dataset.copy ?? "").then(
      () => {
        button.textContent = button.dataset.copied ?? label;
        setTimeout(() => (button.textContent = label), 2000);
      },
      () => {
        // Ha a böngésző nem engedi a másolást, a cím továbbra is kijelölhető és kattintható marad.
      },
    );
  });
}
