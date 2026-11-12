/**
 * Kezdőlap „Rólam” blokkja: bal oldalt a cím (a fejlesztő fő mondata), a bemutatkozás és alatta két szám
 * (ügyfélprojektek és iskolai csapatprojektek, külön, a projektlistából számolva), mindkettő link a szekciójába.
 * Jobbra kisebb sorokban az „Amire figyelek” három elve ikonnal (a fejlesztő ezt a korábbi, tömör változatot
 * kérte vissza a nagy, teljes szélességű sorok helyett). Telefonon egymás alatt.
 */

import type { CSSProperties, ReactNode } from "react";

import { SectionHeading } from "../components/ui/SectionHeading.tsx";
import { messages, type Lang } from "../i18n/index.ts";

interface Props {
  lang: Lang;
  // A Munkáim és az Iskolai projektek darabszáma (views/Kezdolap.astro adja).
  clientCount: number;
  schoolCount: number;
}

// Az elvek ikonjai a values sorrendjében (kód, pajzs, kijelzők).
const ICONS: ReactNode[] = [
  <path key="code" d="M8 7l-5 5 5 5M16 7l5 5-5 5" />,
  <path key="shield" d="M12 3l8 3v6c0 4.500-3.400 8.300-8 9-4.600-.700-8-4.500-8-9V6z" />,
  <g key="screens">
    <rect x="3" y="4" width="13" height="10" rx="1.5" />
    <rect x="15" y="9" width="6" height="11" rx="1.5" />
    <path d="M7 18h5" />
  </g>,
];

export function Rolam({ lang, clientCount, schoolCount }: Props) {
  const t = messages(lang);
  const facts = [
    { count: clientCount, label: t.about.facts.client, href: "#munkak" },
    { count: schoolCount, label: t.about.facts.school, href: "#iskolai" },
  ];

  return (
    <section id="rolam" className="border-t border-line bg-deep-navy">
      <div className="mx-auto grid max-w-280 gap-12 px-5 py-18 md:px-8 md:py-24 lg:grid-cols-12 lg:gap-16 xl:px-0">
        <div className="lg:col-span-7">
          <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />
          <div data-reveal className="mt-6 max-w-2xl space-y-4 leading-relaxed text-mist">
            {t.about.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-8 grid max-w-md grid-cols-2 gap-6">
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

        <div className="lg:col-span-5">
          <h3 className="font-mono text-sm text-slate">{t.about.valuesTitle}</h3>
          <ul className="mt-4 border-b border-line">
            {t.about.values.map((value, index) => (
              <li
                key={value.title}
                data-reveal
                style={{ "--i": index } as CSSProperties}
                className="group border-t border-line py-5"
              >
                <p className="flex items-center gap-3 text-lg leading-tight font-semibold transition-colors duration-200 lg:group-hover:text-signal-blue">
                  <svg
                    className="h-5 w-5 shrink-0 text-signal-blue"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONS[index]}
                  </svg>
                  {value.title}
                </p>
                <p className="mt-1.5 pl-8 text-[0.9375rem] leading-relaxed">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
