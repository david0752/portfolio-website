/**
 * A hero kódablaka: egy szerkesztő-fül, benne a fejlesztő valós adatai TypeScript-objektumként
 * (content/site.ts-ből). Ez az oldal „aláírása”: ebből látszik elsőre, hogy szoftverfejlesztő oldala.
 * Nagy képernyőn a sorok betöltéskor egymás után „begépelődnek” (.type-line, index.css; tiszta CSS,
 * soronként --n = karakterszám, --d = késleltetés). Telefonon és csökkentett mozgásnál rögtön kész.
 * A teljes szöveg a HTML-ben van, így keresők és felolvasók is olvassák.
 */

import type { CSSProperties } from "react";

import { OWNER, STACK } from "../../content/site.ts";
import type { Lang } from "../../i18n/index.ts";

// Egy sor színezett darabokból áll: [szín osztály, szöveg].
type Token = [className: string, text: string];

const KEY = "text-ice-white";
const STR = "text-signal-blue";
const DIM = "text-slate";
const KW = "text-neon-cyan";

const COPY = {
  hu: { role: "szoftverfejlesztő", builds: ["weboldalak", "webes rendszerek"], file: "szanto-david.ts" },
  en: { role: "software developer", builds: ["websites", "web systems"], file: "david-szanto.ts" },
} as const;

const str = (text: string): Token => [STR, `"${text}"`];

function buildLines(lang: Lang): Token[][] {
  const copy = COPY[lang];
  const prop = (key: string, value: Token): Token[] => [[KEY, `  ${key}`], [DIM, ": "], value, [DIM, ","]];
  const item = (text: string): Token[] => [[DIM, "    "], str(text), [DIM, ","]];
  const stack = [STACK.frontend[0], STACK.languages[0], STACK.backend[0], STACK.ops[0]];

  return [
    [[KW, "const "], [KEY, "developer"], [DIM, " = {"]],
    prop("name", str(OWNER.name[lang])),
    prop("role", str(copy.role)),
    prop("based", str(`${OWNER.locality}, ${OWNER.countryCode}`)),
    [[KEY, "  builds"], [DIM, ": ["]],
    ...copy.builds.map(item),
    [[DIM, "  ],"]],
    [[KEY, "  stack"], [DIM, ": ["]],
    ...stack.map(item),
    [[DIM, "  ],"]],
    prop("available", [KW, "true"]),
    [[DIM, "};"]],
  ];
}

// Gépelési sebesség (ms/karakter) és a kezdés késleltetése; az index.css .type-line szabálya ugyanezt használja.
const MS_PER_CHAR = 14;
const START_DELAY = 350;

export function CodeWindow({ lang }: { lang: Lang }) {
  const lines = buildLines(lang);
  let typed = 0;

  return (
    <figure className="overflow-hidden rounded-[14px] border border-line bg-deep-navy/80 backdrop-blur-sm">
      <figcaption className="flex items-center gap-2 border-b border-line px-4 py-2.5 font-mono text-xs text-slate">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-signal-blue" />
        {COPY[lang].file}
      </figcaption>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-[1.75]">
        <code className="grid grid-cols-[auto_1fr] gap-x-4">
          {lines.map((tokens, index) => {
            const length = tokens.reduce((sum, [, text]) => sum + text.length, 0);
            const delay = START_DELAY + typed * MS_PER_CHAR;
            typed += length;

            return (
              <span key={index} className="contents">
                <span aria-hidden="true" className="text-right text-slate/50 select-none">
                  {index + 1}
                </span>
                <span className="type-line" style={{ "--n": length, "--d": `${delay}ms` } as CSSProperties}>
                  {tokens.map(([className, text], tokenIndex) => (
                    <span key={tokenIndex} className={className}>
                      {text}
                    </span>
                  ))}
                </span>
              </span>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}
