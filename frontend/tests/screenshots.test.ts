// A galériaképek (assets/projects/<slug>/admin-*.webp, site-*.webp) 16:9-esek: a nagyító ablak (ui/Gallery.tsx) a
// kép keretét betöltés előtt 16:9-re méretezi, hogy lapozáskor semmi ne ugorjon el. Más arányú kép itt megbukik.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = join(import.meta.dirname, "../src/assets/projects");

// A WebP fejlécéből a kép mérete (VP8 veszteséges, VP8L veszteségmentes vagy VP8X kiterjesztett formátum).
function webpSize(file: string): { width: number; height: number } {
  const data = readFileSync(file);
  const chunk = data.toString("ascii", 12, 16);
  if (chunk === "VP8 ") return { width: data.readUInt16LE(26) & 0x3fff, height: data.readUInt16LE(28) & 0x3fff };
  if (chunk === "VP8L") {
    const bits = data.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === "VP8X") return { width: data.readUIntLE(24, 3) + 1, height: data.readUIntLE(27, 3) + 1 };
  throw new Error(`Ismeretlen WebP formátum: ${file}`);
}

const shots = readdirSync(ROOT, { recursive: true, encoding: "utf8" })
  .filter((file) => /(^|[\\/])(admin|site)-[^\\/]+\.webp$/.test(file))
  .map((file) => join(ROOT, file));

describe("galériaképek", () => {
  it("vannak galériaképek", () => {
    expect(shots.length).toBeGreaterThan(0);
  });

  it.each(shots)("%s 16:9-es", (file) => {
    const { width, height } = webpSize(file);
    expect(Math.abs(width / height - 16 / 9), `${width}×${height}`).toBeLessThan(0.01);
  });
});
