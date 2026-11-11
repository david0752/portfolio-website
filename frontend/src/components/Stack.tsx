/**
 * Kezdőlap „Stack” blokkja: a valóban használt technológiák és eszközök soronként csoportosítva
 * (bal oldalt a csoport neve, jobbra logós címkék: ui/TechChip.tsx). A lista forrása a content/site.ts STACK.
 */

import type { CSSProperties } from "react";

import { STACK } from "../content/site.ts";
import { messages, type Lang } from "../i18n/index.ts";
import { SectionHeading } from "./ui/SectionHeading.tsx";
import { TechChip } from "./ui/TechChip.tsx";

export function Stack({ lang }: { lang: Lang }) {
  const t = messages(lang);
  const groups = Object.keys(STACK) as (keyof typeof STACK)[];

  return (
    <section id="stack" className="border-t border-line bg-deep-navy">
      <div className="mx-auto max-w-280 px-5 py-18 md:px-8 md:py-24 xl:px-0">
        <SectionHeading eyebrow={t.stack.eyebrow} title={t.stack.title} />

        <dl className="mt-12 border-b border-line">
          {groups.map((group, index) => (
            <div
              key={group}
              data-reveal
              style={{ "--i": index } as CSSProperties}
              className="grid gap-3 border-t border-line py-5 md:grid-cols-[220px_1fr] md:items-center md:gap-6"
            >
              <dt className="font-mono text-xs font-medium tracking-[0.08em] text-slate uppercase">{t.stack.groups[group]}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {STACK[group].map((item) => (
                    <TechChip key={item} name={item} />
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
