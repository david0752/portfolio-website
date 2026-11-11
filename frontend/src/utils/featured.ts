/**
 * A kezdőlap projektszekcióiban (Munkáim, Iskolai projektek) csoportonként legfeljebb HOME_LIMIT projekt látszik;
 * a többi a „Minden projektem” oldalon (/munkak/). Ha egy csoportban több projekt van, a fejlesztő a projekt
 * featured jelölésével választja ki, melyik kerüljön a kezdőlapra; ha kevesebbet jelölt meg, a lista sorrendjében
 * töltődik fel. Több jelölés, mint a limit: a build hibával megáll, hogy ne kerülhessen ki téves állapot.
 */

export const HOME_LIMIT = 4;

export function pickForHome<T extends { slug: string; featured?: boolean }>(group: T[]): T[] {
  const featured = group.filter((item) => item.featured);
  if (featured.length > HOME_LIMIT) {
    const names = featured.map((item) => item.slug).join(", ");
    throw new Error(`Legfeljebb ${HOME_LIMIT} kiemelt (featured) projekt lehet egy csoportban, most ${featured.length}: ${names}`);
  }
  if (group.length <= HOME_LIMIT) return group;
  // A kiemeltek, majd a lista elejéről a többi, amíg a limit be nem telik; a megjelenés a lista sorrendjét tartja.
  const chosen = new Set([...featured, ...group.filter((item) => !item.featured)].slice(0, HOME_LIMIT));
  return group.filter((item) => chosen.has(item));
}
