/**
 * Projektoldal képgalériája (React-sziget, client:visible a views/Projekt.astro-ban). A képernyőképek két csoportban
 * állnak: elöl az admin (nem nyilvános) felület, mert azt a látogató máshol nem láthatja, utána a nyilvános oldal.
 * Egy képre kattintva az oldalon belül nyílik meg nagyban (natív <dialog> showModal-lal: Esc bezárja, a fókusz bent
 * marad, bezáráskor visszaáll a képre). Ott: lapozás a kép két szélén középen álló gombokkal vagy a nyilakkal (a lista
 * végén megáll), nagyítás a
 * kisebb betűkhöz (kétszeres szélesség, görgethető), bezárás X-szel vagy a sötét háttérre kattintva.
 * A csoportok data-reveal blokkjainak nincs saját osztálya, mert azt a scripts/reveal.ts kapcsolja; a dialog nincs
 * mozgó blokkban.
 */

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent, type ReactNode } from "react";

import { messages, type Lang } from "../../i18n/index.ts";
import type { Screenshot } from "../../types/project.ts";

interface Props {
  shots: Screenshot[];
  lang: Lang;
}

// Kerek ikongomb a nagyító ablakban (bezárás, nagyítás); a lapozó gomb ugyanez nagyobban, a kép sávjának szélén középen.
const round =
  "grid shrink-0 place-items-center rounded-full border text-ice-white transition-colors lg:hover:border-signal-blue/60";
const control = `${round} h-11 w-11 border-line bg-deep-navy`;
// A lapozó gomb a sötét háttéren is azonnal látszódjon: világosabb kitöltés és keret, nagyobb nyíl. md-től a kép
// sávjának szélén, függőlegesen középen; telefonon a kép alatti sorban.
const nav = `${round} h-12 w-12 border-mist/40 bg-card-navy-hi md:absolute md:top-1/2 md:-translate-y-1/2`;

// Tabler vonalikonok (MIT), a gombok tartalma.
function Icon({ children, className = "h-5 w-5" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

export function Gallery({ shots, lang }: Props) {
  const t = messages(lang).work;
  const dialog = useRef<HTMLDialogElement>(null);
  const captionId = useId();
  const [current, setCurrent] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  // Elöl az admin képek; a lapozás is ebben a sorrendben megy végig az összesen.
  const admin = shots.filter((shot) => shot.admin);
  const site = shots.filter((shot) => !shot.admin);
  const ordered = [...admin, ...site];
  const groups = [
    { label: t.shotsAdmin, items: admin, start: 0 },
    { label: t.shotsSite, items: site, start: admin.length },
  ].filter((group) => group.items.length);
  const shot = ordered[current];
  const last = ordered.length - 1;

  const open = (index: number) => {
    setCurrent(index);
    setZoomed(false);
    dialog.current?.showModal();
    // A böngésző az első gombra (nagyítás) tenné a fókuszt, és Safari kiemelt keretet rajzolna köré, mintha be lenne
    // kapcsolva; így maga az ablak kapja, a nyilak, az Esc és a Tab ugyanúgy működnek.
    dialog.current?.focus();
  };
  const go = (step: number) => {
    setCurrent((index) => Math.min(last, Math.max(0, index + step)));
    setZoomed(false);
  };
  // Nagyított képnél a nyilak a képet görgetik, ezért csak alapnézetben lapoznak.
  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (zoomed) return;
    if (event.key === "ArrowLeft") go(-1);
    if (event.key === "ArrowRight") go(1);
  };
  // A sötét háttér (a dialog és a kép körüli üres sáv) bezár; a kép, a gombok és a felirat nem.
  const onClick = (event: MouseEvent<HTMLDialogElement>) => {
    if ((event.target as HTMLElement).hasAttribute("data-close")) dialog.current?.close();
  };

  // Előző nyíl, felirat, következő nyíl egy sorban: telefonon a kép alatt, a felirat a két nyíl között (a sor mindig
  // legalább gombnyi magas, így a felirat hossza sem mozgat semmit). md-től a sor eltűnik (contents): a gombok a kép
  // sávjának két szélére, függőlegesen középre kerülnek, a felirat a kép alá. A lista elején az előző, a végén a
  // következő nyíl láthatatlan (invisible: a helyét megtartja, így semmi nem ugrik el, és nem fókuszálható); egyetlen
  // képnél egyik sem látszik.
  const pager = (
    <div data-close className="grid min-h-12 w-full grid-cols-[3rem_1fr_3rem] items-center gap-3 md:contents">
      <button type="button" aria-label={t.shotPrev} onClick={() => go(-1)} className={`${nav} md:left-6 ${current === 0 ? "invisible" : ""}`}>
        <Icon className="h-6 w-6">
          <path d="M15 6l-6 6l6 6" />
        </Icon>
      </button>
      {/* Nagyítva md-től a felirat a kép sávja alatt áll (abszolút, a sáv alsó margójában), hogy ne vegyen el a sávból:
          így a sáv közepe, és vele a két nyíl, a kép közepén marad. */}
      <p
        id={captionId}
        className={`text-center text-sm leading-snug text-mist md:text-[0.9375rem] ${zoomed ? "md:absolute md:inset-x-0 md:top-full md:mt-2" : ""}`}
      >
        {shot.caption[lang]}
      </p>
      <button type="button" aria-label={t.shotNext} onClick={() => go(1)} className={`${nav} md:right-6 ${current === last ? "invisible" : ""}`}>
        <Icon className="h-6 w-6">
          <path d="M9 6l6 6l-6 6" />
        </Icon>
      </button>
    </div>
  );

  return (
    <>
      <div className="space-y-10 md:space-y-12">
        {groups.map((group, index) => (
          <div key={group.label} data-reveal style={{ "--i": index } as CSSProperties}>
            <h3 className="font-mono text-xs font-normal tracking-[0.08em] text-slate uppercase">{group.label}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 md:mt-5 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-8">
              {group.items.map((item, i) => (
                <li key={item.src}>
                  <button type="button" aria-haspopup="dialog" onClick={() => open(group.start + i)} className="group block w-full text-left">
                    <span className="block aspect-video overflow-hidden rounded-[14px] border border-line bg-deep-navy transition-colors lg:group-hover:border-signal-blue/60">
                      <img
                        src={item.src}
                        srcSet={item.srcSet}
                        sizes="(min-width: 1024px) 360px, 50vw"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-top-left transition-transform duration-500 ease-out-soft lg:group-hover:scale-[1.02]"
                      />
                    </span>
                    <span className="mt-2.5 block text-sm leading-snug text-mist transition-colors lg:group-hover:text-ice-white">{item.caption[lang]}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <dialog
        ref={dialog}
        tabIndex={-1}
        data-close
        aria-labelledby={captionId}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onClose={() => setZoomed(false)}
        className="lightbox m-0 h-dvh max-h-none w-screen max-w-none bg-midnight/96 p-0 text-ice-white outline-none backdrop:bg-transparent"
      >
        <div data-close className="flex h-full flex-col pb-4">
          <div data-close className="flex items-center justify-between gap-4 px-4 pt-4 md:px-6">
            <p className="font-mono text-xs text-slate">
              {current + 1} / {ordered.length} · {shot.admin ? t.shotsAdmin : t.shotsSite}
            </p>
            <div className="flex gap-2">
              <button type="button" aria-pressed={zoomed} aria-label={zoomed ? t.zoomOut : t.zoomIn} onClick={() => setZoomed(!zoomed)} className={control}>
                <Icon>
                  <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0M21 21l-6 -6M7 10h6" />
                  {!zoomed && <path d="M10 7v6" />}
                </Icon>
              </button>
              <button type="button" aria-label={t.shotClose} onClick={() => dialog.current?.close()} className={control}>
                <Icon>
                  <path d="M18 6l-12 12M6 6l12 12" />
                </Icon>
              </button>
            </div>
          </div>

          {/* A kép sávja. A lapozó gombok sosem takarják a képet: md-től a kép mellett, a két szélén, függőlegesen
              középen (a sor md:contents, a gombok a relative sávhoz igazodnak); telefonon, ahol a kép mellett nincs
              hely, közvetlenül a kép alatt, balra és jobbra. Nagyítva a görgetett képen kívül állnak (telefonon a sáv
              alatt), így mindig kéznél vannak. */}
          <div data-close className={`relative mt-3 flex min-h-0 flex-1 flex-col justify-center ${zoomed ? "md:mb-9" : ""}`}>
            {/* Nagyítva telefonon a görgethető sáv csak akkora, mint a kép (legfeljebb a rendelkezésre álló hely), így
                a gombok közvetlenül alatta maradnak; md-től kitölti a sávot, de a két szélén helyet hagy a gomboknak
                (md:mx-24, mint alapnézetben), így nagyítva sem lógnak rá a képre. Telefonon a
                görgetősáv rejtett (ujjal görget): a helyet foglaló sáv különben levágná a kép alját, és egy második,
                függőleges sávot is behozna. */}
            {/* Alapnézetben a kép keretének mérete nem a betöltött képtől függ: a sáv méret-konténer
                ([container-type:size]), a kép 16:9-es (aspect-video), szélessége a sáv szélessége vagy a sáv magasságából
                (a felirat sorának levonásával) számolt 16:9-es szélesség, amelyik kisebb. Így lapozáskor, amíg a
                következő kép töltődik, sem a gombok, sem a felirat nem ugrik el. A galériaképek 16:9-esek (1536×864-es
                ablakból készülnek; a tests/screenshots.test.ts őrzi). */}
            <div
              data-close
              className={`min-h-0 ${zoomed ? "overflow-auto max-md:[scrollbar-width:none] md:mx-24 md:flex-1" : "flex flex-1 flex-col items-center justify-center gap-4 px-4 [container-type:size] md:px-24"}`}
            >
              <img
                key={shot.src}
                src={shot.src}
                srcSet={shot.srcSet}
                sizes="100vw"
                alt={shot.caption[lang]}
                onClick={() => setZoomed(!zoomed)}
                className={
                  zoomed
                    ? "w-[200%] max-w-none cursor-zoom-out"
                    : "aspect-video w-[min(100cqw,calc((100cqh-4rem)*16/9))] shrink-0 cursor-zoom-in rounded-[14px] border border-line bg-deep-navy object-contain md:w-[min(100cqw,calc((100cqh-3rem)*16/9))]"
                }
              />
              {!zoomed && pager}
            </div>
            {zoomed && <div className="px-4 pt-4 md:contents">{pager}</div>}
          </div>
        </div>
      </dialog>
    </>
  );
}
