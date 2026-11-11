/**
 * Technológia-címke logóval (a Stack blokkban és a projektoldalak stack részén).
 * A márkalogók a simple-icons csomagból jönnek a márka saját színével; ami ott nincs (REST API, ChatGPT), az a
 * Tabler ikoncsomagból (MIT). Mindkettő csak építéskor fut: a böngészőbe kész SVG kerül, JavaScript nem.
 * A nagyon sötét márkaszínek (pl. Express, GitHub) világosat kapnak, hogy a sötét háttéren is látsszanak.
 * Ismeretlen névnél logó nélküli címke.
 */

import { icons as tabler } from "@iconify-json/tabler";
import {
  siAstro,
  siClaude,
  siCloudflare,
  siCss,
  siDocker,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLinux,
  siMysql,
  siNginx,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
  siVite,
  siVitest,
  type SimpleIcon,
} from "simple-icons";

// Kitöltött márkalogók (simple-icons, 24x24, egy path + márkaszín).
const BRAND: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  Python: siPython,
  HTML: siHtml5,
  CSS: siCss,
  React: siReact,
  Astro: siAstro,
  "Tailwind CSS": siTailwindcss,
  Vite: siVite,
  "Node.js": siNodedotjs,
  Express: siExpress,
  PostgreSQL: siPostgresql,
  Prisma: siPrisma,
  Docker: siDocker,
  "Three.js": siThreedotjs,
  MySQL: siMysql,
  "Linux VPS": siLinux,
  nginx: siNginx,
  Cloudflare: siCloudflare,
  Git: siGit,
  GitHub: siGithub,
  Vitest: siVitest,
  Claude: siClaude,
};

// Vonalas ikonok a Tablerből (24x24, a body kész SVG-tartalom, currentColor színnel).
const LINE: Record<string, { body: string; color: string }> = {
  "REST API": { body: tabler.icons.api.body, color: "var(--color-signal-blue)" },
  ChatGPT: { body: tabler.icons["brand-openai"].body, color: "var(--color-ice-white)" },
};

// A márkaszín, kivéve ha túl sötét a sötét háttérhez: akkor az oldal világos szövegszíne.
function brandColor(hex: string): string {
  const [r, g, b] = [0, 2, 4].map((start) => parseInt(hex.slice(start, start + 2), 16));
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 70 ? "var(--color-ice-white)" : `#${hex}`;
}

const iconClass = "h-4.5 w-4.5 shrink-0";

export function TechChip({ name }: { name: string }) {
  const brand = BRAND[name];
  const line = LINE[name];

  return (
    <li className="inline-flex items-center gap-2.5 rounded-lg border border-line bg-card-navy px-3 py-2 text-[0.9375rem] text-ice-white transition-colors duration-200 lg:hover:border-signal-blue/60">
      {brand && (
        <svg className={iconClass} viewBox="0 0 24 24" fill={brandColor(brand.hex)} aria-hidden="true">
          <path d={brand.path} />
        </svg>
      )}
      {/* A Tabler-ikon tartalma a csomagból jön (statikus, megbízható adat), ezért beilleszthető HTML-ként. */}
      {line && <svg className={iconClass} viewBox="0 0 24 24" style={{ color: line.color }} aria-hidden="true" dangerouslySetInnerHTML={{ __html: line.body }} />}
      {name}
    </li>
  );
}
