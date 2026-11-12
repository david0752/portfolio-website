/**
 * Kezdőlap „Rólam” blokkja: a cím a fejlesztő fő mondata nagy méretben; alatta balra a bemutatkozás, jobbra két
 * szám (ügyfélprojektek és iskolai csapatprojektek, külön, a projektlistából számolva), mindkettő link a szekciójába.
 * Lent az „Amire figyelek”: a három elv teljes szélességű sorokban, balra ikon és nagy betűvel az elv, jobbra egy
 * egyszerű, ügyfélnek szóló mondat. Nincs kattintás vagy technikai részlet; az ikon (Tabler, építéskor kész SVG) a
 * fejlesztő kérésére került a sor elejére, mert ikon nélkül üresnek hatott.
 */

import { icons as tabler } from "@iconify-json/tabler";
import type { CSSProperties } from "react";

import { SectionHeading } from "../components/ui/SectionHeading.tsx";
import { messages, type Lang } from "../i18n/index.ts";

interface Props {
  lang: Lang;
  // A Munkáim és az Iskolai projektek darabszáma (views/Kezdolap.astro adja).
  clientCount: number;
  schoolCount: number;
}

// Az elvek ikonjai a values sorrendjében (kód, pajzs, eszközök); a Tabler-tartalom statikus csomagadat.
const VALUE_ICONS = [tabler.icons.code.body, tabler.icons["shield-check"].body, tabler.icons.devices.body];

export function Rolam({ lang, clientCount, schoolCount }: Props) {
  const t = messages(lang);
  const facts = [
    { count: clientCount, label: t.about.facts.client, href: "#munkak" },
    { count: schoolCount, label: t.about.facts.school, href: "#iskolai" },
  ];
  return (
    <section id="rolam" className="border-t border-line bg-deep-navy">
      <div className="mx-auto max-w-280 px-5 py-18 md:px-8 md:py-24 xl:px-0">
        <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="max-w-2xl space-y-4 leading-relaxed text-mist lg:col-span-7">
            {t.about.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="grid grid-cols-2 gap-6 self-start lg:col-span-5">
            {facts.map((fact, index) => (
              <li key={fact.href} data-reveal style={{ "--i": index + 1 } as CSSProperties}>
                <a href={fact.href} className="group block h-full rounded-[14px] bg-midnight/60 p-5 transition-colors lg:hover:bg-midnight">
                  {/* A szám legfeljebb akkora, mint a szekciócím (H2), hogy ne nőjön fölé. */}
                  <span className="block text-[clamp(1.75rem,2vw+1rem,2.5rem)] leading-none font-semibold tracking-[-0.02em] text-ice-white">{fact.count}</span>
                  <span className="mt-3 flex items-baseline justify-between gap-2 text-[0.9375rem] leading-snug text-mist">
                    {fact.count === 1 ? fact.label.one : fact.label.other}
                    <span aria-hidden="true" className="text-signal-blue transition-transform lg:group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <h3 className="mt-16 font-mono text-sm text-slate md:mt-20">{t.about.valuesTitle}</h3>
        <ul className="mt-6 border-b border-line">
          {t.about.values.map((value, index) => (
            <li
              key={value.title}
              data-reveal
              style={{ "--i": index } as CSSProperties}
              className="grid gap-2 border-t border-line py-6 md:grid-cols-12 md:items-center md:gap-8 md:py-8"
            >
              <div className="flex items-center gap-4 md:col-span-5">
                <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-signal-blue/10 text-signal-blue">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: VALUE_ICONS[index] }} />
                </span>
                <h4 className="text-2xl leading-tight font-semibold tracking-[-0.02em] text-ice-white lg:text-[1.625rem]">{value.title}</h4>
              </div>
              {/* Telefonon a mondat a cím alá, vele egy vonalba kerül (ikon 48px + 16px köz = pl-16). */}
              <p className="pl-16 leading-relaxed text-mist md:col-span-7 md:pl-0">{value.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
