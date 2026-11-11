/**
 * Előtte / utána összehasonlítás egy felújított oldal projektoldalán (React-sziget, client:visible a views/Projekt.astro-ban).
 * A két képernyőkép egymáson fekszik, az „utána” kép a csúszkától jobbra látszik (clip-path). A billentyűzetnek és a
 * képernyőolvasónak egy láthatatlan, natív range input szól (nyilak, Home/End); egérrel és ujjal a keret pointer-
 * eseményei mozgatják, mert a natív csúszka telefonon görgetés közben is az ujj alá ugrana. A látható vonal és
 * fogantyú csak rajz. JavaScript nélkül 50%-on áll.
 * Fölötte nézetváltó: asztali vagy mobil képpár.
 */

import { useRef, useState, type CSSProperties, type PointerEvent } from "react";

import { messages, type Lang } from "../../i18n/index.ts";
import type { Comparison, ComparisonView } from "../../types/project.ts";

interface Props {
  comparison: Comparison;
  lang: Lang;
}

// Az ablak mérete (CSS px), amekkorában a képernyőképek készültek: ebből a keret aránya, így betöltéskor nem ugrik
// az oldal. A mobilkép keskeny, telefon arányú keretbe kerül.
const VIEWS: Record<ComparisonView, { width: number; height: number; frame: string; sizes: string }> = {
  desktop: { width: 1536, height: 864, frame: "w-full", sizes: "(min-width: 1184px) 1120px, 100vw" },
  mobile: { width: 390, height: 844, frame: "w-full max-w-[320px]", sizes: "320px" },
};

// Előtte / utána címke a keret alsó sarkaiban (fent a képernyőképek menüsora van, azt ne takarja).
const label = "pointer-events-none absolute bottom-3 rounded-full bg-midnight/85 px-2.5 py-1 font-mono text-xs text-ice-white";

export function BeforeAfter({ comparison, lang }: Props) {
  const t = messages(lang).work;
  const [view, setView] = useState<ComparisonView>("desktop");
  const [position, setPosition] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const shots = comparison[view];
  const size = VIEWS[view];
  const image = { width: size.width, height: size.height, sizes: size.sizes, draggable: false, decoding: "async" as const };

  // A csúszka a mutató vízszintes helyére áll (0–100%).
  const moveTo = (clientX: number) => {
    const rect = frame.current!.getBoundingClientRect();
    setPosition(Math.round(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))));
  };
  // Egérrel a lenyomás is odaugrik. Ujjal csak a koppintás vagy a többnyire vízszintes húzás mozgat: a függőleges
  // húzás görgetés (touch-action: pan-y), és a böngésző az első mozdulatot még a görgetés előtt elküldheti.
  const touch = useRef<{ x: number; y: number; dragging: boolean } | null>(null);
  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    if (event.pointerType === "touch") touch.current = { x: event.clientX, y: event.clientY, dragging: false };
    else moveTo(event.clientX);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const start = touch.current;
    if (event.pointerType === "touch" && start && !start.dragging) {
      const dx = Math.abs(event.clientX - start.x);
      if (dx < 8 || dx <= Math.abs(event.clientY - start.y)) return;
      start.dragging = true;
    }
    moveTo(event.clientX);
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" && touch.current) moveTo(event.clientX);
    touch.current = null;
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div role="group" aria-label={t.compareView} className="flex rounded-full border border-line p-0.5 font-mono text-xs">
          {(["desktop", "mobile"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={view === item}
              onClick={() => setView(item)}
              className={`rounded-full px-3 py-1.5 transition-colors ${
                view === item ? "bg-card-navy-hi text-ice-white" : "text-slate lg:hover:text-ice-white"
              }`}
            >
              {t[item]}
            </button>
          ))}
        </div>
        <p className="font-mono text-xs text-slate">{t.compareHint}</p>
      </div>

      <div
        ref={frame}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (touch.current = null)}
        className={`relative mx-auto mt-4 cursor-ew-resize touch-pan-y overflow-hidden rounded-[14px] border border-line bg-deep-navy select-none ${size.frame}`}
        style={{ aspectRatio: `${size.width} / ${size.height}`, "--pos": `${position}%` } as CSSProperties}
      >
        <img {...image} src={shots.before.src} srcSet={shots.before.srcSet} alt={t.beforeAlt[view]} className="absolute inset-0 h-full w-full object-cover" />
        <img
          {...image}
          src={shots.after.src}
          srcSet={shots.after.srcSet}
          alt={t.afterAlt[view]}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: "inset(0 0 0 var(--pos))" }}
        />
        <span aria-hidden="true" className={`${label} left-3`}>
          {t.before}
        </span>
        <span aria-hidden="true" className={`${label} right-3`}>
          {t.after}
        </span>

        {/* Csak billentyűzet és képernyőolvasó: a mutatót a keret kezeli (pointer-events-none). */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label={t.compareSlider}
          aria-valuetext={`${position}%`}
          className="peer pointer-events-none absolute inset-0 m-0 h-full w-full opacity-0"
        />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-ice-white/90" style={{ left: "var(--pos)" }} />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 grid h-10 w-10 -translate-1/2 place-items-center rounded-full border border-ice-white/90 bg-midnight/90 text-ice-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-neon-cyan"
          style={{ left: "var(--pos)" }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>
    </div>
  );
}
