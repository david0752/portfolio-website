// A kezdőlap projektválasztása (utils/featured.ts): csoportonként legfeljebb HOME_LIMIT projekt, a kiemeltek elöl
// választva, a lista sorrendjében; a limitnél több kiemelés hiba. Sok projekttel is (a mainál jóval több adat).
import { describe, expect, it } from "vitest";

import { HOME_LIMIT, pickForHome } from "../src/utils/featured.ts";

const make = (count: number, featured: number[] = []) =>
  Array.from({ length: count }, (_, i) => ({ slug: `p${i}`, featured: featured.includes(i) }));
const slugs = (list: { slug: string }[]) => list.map((item) => item.slug);

describe("pickForHome", () => {
  it("a limitig minden projektet mutat, a lista sorrendjében", () => {
    expect(slugs(pickForHome(make(HOME_LIMIT)))).toEqual(slugs(make(HOME_LIMIT)));
  });

  it("sok projektnél (50) is csak a limitnyit, a lista elejéről", () => {
    expect(slugs(pickForHome(make(50)))).toEqual(["p0", "p1", "p2", "p3"].slice(0, HOME_LIMIT));
  });

  it("a kiemelteket választja, a többit a lista elejéről tölti fel, a sorrend a listáé marad", () => {
    expect(slugs(pickForHome(make(10, [7, 2])))).toEqual(["p0", "p1", "p2", "p7"]);
  });

  it("a limitnél több kiemelésnél hibával megáll", () => {
    expect(() => pickForHome(make(10, [0, 1, 2, 3, 4]))).toThrow(/Legfeljebb/);
  });
});
