/**
 * Gépelős (konzol) szóváltás: a data-typewriter elem szövegét kitörli betűnként, majd begépeli a következő
 * szót, körbe-körbe. A szavak listája az attribútumban van (JSON tömb), az első már a HTML-ben áll.
 * Csak nagy képernyőn és csak akkor fut, ha a látogató nem kért csökkentett mozgást; különben az első szó marad.
 * Sima böngészőscript, a Layout.astro tölti be.
 */

const HOLD = 2400; // ennyi ideig áll egy kész szó (ms)
const FIRST_HOLD = 4600; // az első váltás megvárja, hogy a hero kódablaka végiggépelje magát
const TYPE = 75; // egy betű begépelése (ms)
const ERASE = 40; // egy betű törlése (ms)

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const allowed = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");

async function run(el: HTMLElement, words: string[]) {
  let index = 0;
  await wait(FIRST_HOLD);

  // Ha közben kisebb lett az ablak vagy csökkentett mozgást kértek, a teljes szóval megáll.
  while (allowed.matches) {
    const current = words[index];
    for (let length = current.length - 1; length >= 0; length--) {
      el.textContent = current.slice(0, length);
      await wait(ERASE);
    }

    index = (index + 1) % words.length;
    const next = words[index];
    for (let length = 1; length <= next.length; length++) {
      el.textContent = next.slice(0, length);
      await wait(TYPE);
    }

    await wait(HOLD);
  }
}

for (const el of document.querySelectorAll<HTMLElement>("[data-typewriter]")) {
  const words = JSON.parse(el.dataset.typewriter ?? "[]") as string[];
  if (words.length > 1 && allowed.matches) void run(el, words);
}
