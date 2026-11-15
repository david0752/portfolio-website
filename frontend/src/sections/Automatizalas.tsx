/**
 * Kezdőlap „Automatizálás” blokkja a Munkáim előtt: amit a fejlesztő a legjobban szeret csinálni.
 * Bal oldalt a cím és a bevezető, jobbra az ügyfél haszna három rövid sorban (mint a Rólam „Amire figyelek” listája).
 * Alatta hat példakártya: mi megy most kézzel („eddig”) és mi lesz belőle („automatizálva”), hogy a látogató a saját
 * munkájára ismerjen rá; a végén link a kapcsolati űrlapra. Telefonon minden egymás alatt.
 */

import type { CSSProperties, ReactNode } from "react";

import { SectionHeading } from "../components/ui/SectionHeading.tsx";
import { messages, type Lang } from "../i18n/index.ts";

// A haszon ikonjai a benefits sorrendjében (óra, pipa, villám).
const BENEFIT_ICONS: ReactNode[] = [
  <g key="clock">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </g>,
  <path key="check" d="M5 12l5 5L20 7" />,
  <path key="bolt" d="M13 3L4 14h7l-1 7 9-11h-7z" />,
];

// A példák ikonjai az examples sorrendjében (naptár, levél, adatbázis, dokumentum, grafikon, lánc).
const EXAMPLE_ICONS: ReactNode[] = [
  <g key="calendar">
    <rect x="4" y="5" width="16" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M4 11h16" />
  </g>,
  <g key="mail">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </g>,
  <g key="database">
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v6c0 1.700 3.600 3 8 3s8-1.300 8-3V6M4 12v6c0 1.700 3.600 3 8 3s8-1.300 8-3v-6" />
  </g>,
  <g key="file">
    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
    <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2zM9 13h6M9 17h6" />
  </g>,
  <path key="chart" d="M4 20h16M7 16v-4M12 16V8M17 16V5" />,
  <path key="link" d="M9 15l6-6M11 6l.5-.5a5 5 0 0 1 7 7l-.5.5M13 18l-.5.5a5 5 0 0 1-7-7l.5-.5" />,
];

function Icon({ children, className }: { children: ReactNode; className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export function Automatizalas({ lang }: { lang: Lang }) {
  const t = messages(lang).automation;

  return (
    <section id="automatizalas" className="border-t border-line bg-deep-navy">
      <div className="mx-auto max-w-280 px-5 py-18 md:px-8 md:py-24 xl:px-0">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          </div>

          <div className="lg:col-span-5">
            <h3 className="font-mono text-sm text-slate">{t.benefitsTitle}</h3>
            <ul className="mt-4 border-b border-line">
              {t.benefits.map((benefit, index) => (
                <li key={benefit.title} data-reveal style={{ "--i": index } as CSSProperties} className="border-t border-line py-4">
                  <p className="flex items-center gap-3 text-lg leading-tight font-semibold">
                    <Icon className="h-5 w-5 shrink-0 text-signal-blue">{BENEFIT_ICONS[index]}</Icon>
                    {benefit.title}
                  </p>
                  <p className="mt-1.5 pl-8 text-[0.9375rem] leading-relaxed">{benefit.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className="mt-14 font-mono text-sm text-slate md:mt-16">{t.examplesTitle}</h3>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {t.examples.map((example, index) => (
            <li
              key={example.title}
              data-reveal
              style={{ "--i": index % 3 } as CSSProperties}
              className="flex flex-col rounded-[14px] border border-line bg-card-navy p-5 md:p-6"
            >
              <p className="flex items-center gap-3 text-lg leading-tight font-semibold">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-signal-blue/10 text-signal-blue">
                  <Icon className="h-5 w-5">{EXAMPLE_ICONS[index]}</Icon>
                </span>
                {example.title}
              </p>
              {/* Mi megy most kézzel, és mi lesz belőle: a régi halványan, az új hangsúlyosan. */}
              <dl className="mt-5 space-y-3 text-[0.9375rem] leading-relaxed">
                <div>
                  <dt className="font-mono text-xs font-medium tracking-[0.08em] text-slate uppercase">{t.before}</dt>
                  <dd className="mt-1 text-slate">{example.before}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs font-medium tracking-[0.08em] text-signal-blue uppercase">
                    <span aria-hidden="true">→ </span>
                    {t.after}
                  </dt>
                  <dd className="mt-1 text-ice-white">{example.after}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <p data-reveal className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-mist">
          {t.ctaLead}
          {/* Csak a szöveg kap aláhúzást (a nyíl nem), különben a köztük lévő rés aláhúzatlan foltként látszik. */}
          <a href="#kapcsolat" className="group inline-flex items-center gap-2 font-medium text-signal-blue">
            <span className="underline-offset-4 lg:group-hover:underline">{t.cta}</span>
            <span aria-hidden="true" className="transition-transform lg:group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </p>
      </div>
    </section>
  );
}
