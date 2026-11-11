/**
 * Az automatikus nyelv tesztjei (npm test): mikor kerül a látogató a magyar oldalról az angol párjára, és mikor nem
 * (magyar böngésző, robot, belső navigáció, fejléc nélküli kérés), valamint hogy a továbbadott oldal megkapja a
 * biztonsági fejléceket. A Worker fetch függvényét hívják hamis ASSETS-szel.
 */

import { describe, expect, it } from "vitest";

import { acceptsHungarian, englishPath } from "../src/middleware/LanguageRedirect.middleware.js";
import worker from "../src/worker.js";

const SITE = "https://szdavid.dev";
const CHROME = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36";

const env = {
  ASSETS: { fetch: async () => new Response("<html>magyar oldal</html>", { headers: { "Content-Type": "text/html" } }) },
} as unknown as Env;

async function visit(path: string, headers: Record<string, string> = {}) {
  const request = new Request(`${SITE}${path}`, { headers: { "User-Agent": CHROME, ...headers } });
  return worker.fetch(request as Parameters<typeof worker.fetch>[0], env, {} as ExecutionContext);
}

describe("englishPath", () => {
  it("a magyar oldalak angol párját adja, ismeretlen címre null-t", () => {
    expect(englishPath("/")).toBe("/en/");
    expect(englishPath("/adatvedelem/")).toBe("/en/privacy/");
    expect(englishPath("/munkak/")).toBe("/en/work/");
    expect(englishPath("/munkak/pollakfind/")).toBe("/en/work/pollakfind/");
    expect(englishPath("/en/")).toBeNull();
    expect(englishPath("/favicon.svg")).toBeNull();
  });
});

describe("acceptsHungarian", () => {
  it("felismeri a magyart bármelyik helyen, a q=0-t kizárásnak veszi", () => {
    expect(acceptsHungarian("hu-HU,hu;q=0.9,en;q=0.8")).toBe(true);
    expect(acceptsHungarian("en-US,en;q=0.9,hu;q=0.5")).toBe(true);
    expect(acceptsHungarian("en-GB,en;q=0.9")).toBe(false);
    expect(acceptsHungarian("de-DE, hu;q=0")).toBe(false);
    expect(acceptsHungarian("hun")).toBe(false);
  });
});

describe("nyelvi átirányítás", () => {
  it("nem magyar böngészőt a magyar oldalról az angol párra küld, a lekérdezést megtartva", async () => {
    const response = await visit("/munkak/pollakfind/?ref=x", { "Accept-Language": "en-US,en;q=0.9" });
    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/en/work/pollakfind/?ref=x");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });

  it("magyar böngészőnél a magyar oldal marad, biztonsági fejlécekkel", async () => {
    const response = await visit("/", { "Accept-Language": "hu-HU,hu;q=0.9" });
    expect(response.status).toBe(200);
    expect(await response.text()).toContain("magyar oldal");
    expect(response.headers.get("Strict-Transport-Security")).toContain("max-age=63072000");
    expect(response.headers.get("X-Frame-Options")).toBe("DENY");
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
  });

  it("nem irányít át, ha a látogató az oldalon belülről jön (pl. a nyelvváltóval magyarra váltott)", async () => {
    const response = await visit("/", { "Accept-Language": "en-US", Referer: `${SITE}/en/` });
    expect(response.status).toBe(200);
  });

  it("külső oldalról érkezőt átirányít", async () => {
    const response = await visit("/", { "Accept-Language": "de-DE", Referer: "https://www.google.com/" });
    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/en/");
  });

  it("nem irányít át fejléc nélkül és robotnál (keresők, megosztási előnézetek)", async () => {
    expect((await visit("/")).status).toBe(200);
    expect((await visit("/", { "Accept-Language": "en-US", "User-Agent": "Mozilla/5.0 (compatible; bingbot/2.0)" })).status).toBe(200);
    expect((await visit("/", { "Accept-Language": "en-US", "User-Agent": "facebookexternalhit/1.1" })).status).toBe(200);
  });

  it("hibás Referer fejléc nem okoz hibát", async () => {
    const response = await visit("/", { "Accept-Language": "en-US", Referer: "nem-url" });
    expect(response.status).toBe(302);
  });
});
