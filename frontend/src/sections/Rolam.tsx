/**
 * Kezdőlap „Rólam” blokkja: a cím a fejlesztő fő mondata nagy méretben; alatta balra a bemutatkozás, jobbra két
 * szám (az összes projekt és ebből az iskolai csapatprojektek, a projektlistából számolva), mindkettő link a szekciójába. Lent az
 * „Amire figyelek” három elve, mindegyik állítás + bizonyíték a saját munkáiból, linkkel. Ikonok és kártyák nélkül.
 * A szövegek az i18n about kulcsai alatt; a bizonyítékok linkjei a values sorrendjében (proofLinks).
 */

import type { CSSProperties } from "react";

import { SectionHeading } from "../components/ui/SectionHeading.tsx";
import { SITE_REPO } from "../content/site.ts";
import { messages, paths, type Lang } from "../i18n/index.ts";

interface Props {
  lang: Lang;
  // A Munkáim és az Iskolai projektek darabszáma (views/Kezdolap.astro adja).
  clientCount: number;
  schoolCount: number;
}

// Az elvek bizonyítékának linkje, a values sorrendjében: a forráskód (új lapon), majd egy-egy projektoldal.
const proofLinks = (lang: Lang) => [
  { href: SITE_REPO, external: true },
  { href: paths(lang).project("kunmadaras-drift"), external: false },
  { href: paths(lang).project("pollakfind"), external: false },
];

export function Rolam({ lang, clientCount, schoolCount }: Props) {
  const t = messages(lang);
  const links = proofLinks(lang);
  const facts = [
    { count: clientCount + schoolCount, label: t.about.facts.total, href: "#munkak" },
    { count: schoolCount, label: t.about.facts.school, href: "#iskolai" },
  ];

  return (
    <section id="rolam" className="border-t border-line bg-deep-navy">
      <div className="mx-auto max-w-280 px-5 py-18 md:px-8 md:py-24 xl:px-0">
        <SectionHeading statement eyebrow={t.about.eyebrow} title={t.about.title} />

        <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="max-w-2xl space-y-4 text-lg leading-relaxed text-mist lg:col-span-7">
            {t.about.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="grid grid-cols-2 gap-6 self-start lg:col-span-5">
            {facts.map((fact, index) => (
              <li key={fact.href} data-reveal style={{ "--i": index + 1 } as CSSProperties}>
                <a href={fact.href} className="group block h-full rounded-[14px] bg-midnight/60 p-5 transition-colors lg:hover:bg-midnight">
                  <span className="block text-5xl leading-none font-semibold tracking-[-0.04em] text-ice-white">{fact.count}</span>
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
        {/* Nagyobb képernyőn subgrid: a cím, az állítás, a bizonyíték és a link mindhárom oszlopban egy vonalban áll. */}
        <ul className="mt-6 grid gap-10 md:grid-cols-3 md:gap-x-8 md:gap-y-0 lg:gap-x-12">
          {t.about.values.map((value, index) => {
            const link = links[index];
            return (
              <li key={value.title} data-reveal style={{ "--i": index } as CSSProperties} className="flex flex-col md:row-span-4 md:grid md:grid-rows-subgrid">
                <h4 className="text-2xl leading-tight font-semibold tracking-[-0.02em] text-ice-white">{value.title}</h4>
                <p className="mt-2 text-[0.9375rem] leading-relaxed">{value.text}</p>
                {/* A bizonyíték ugyanazzal a kék bal szegéllyel, mint a projektoldalak kiemelt pontjai. */}
                <p className="mt-5 border-l-2 border-signal-blue/50 pl-4 text-[0.9375rem] leading-relaxed text-ice-white/90 md:text-base">
                  {value.proof}
                </p>
                <a
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group mt-4 inline-flex items-center gap-2 self-start pl-4.5 text-[0.9375rem] font-medium text-signal-blue underline-offset-4 lg:hover:underline"
                >
                  {value.link}
                  <span aria-hidden="true" className="transition-transform lg:group-hover:translate-x-0.5">
                    {link.external ? "↗" : "→"}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
