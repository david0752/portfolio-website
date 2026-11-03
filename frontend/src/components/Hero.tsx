/**
 * Kezdőlap nyitóblokkja: szerep, főcím egy neon szóval, bemutatkozó mondat, „elérhető” pötty, két gomb.
 * Háttér: halvány rács és egy kék radiális fény; nagy képernyőn a rács kéken felizzik az egér körül
 * (.hero-grid-glow, index.css). Az egér helyét CSS-változók viszik át, így nincs újrarenderelés.
 */

import { useRef, type PointerEvent } from "react";
import { Link } from "react-router";

import { useI18n } from "../i18n/I18nProvider.tsx";
import { buttonPrimary, buttonSecondary } from "./ui/Button.tsx";

export function Hero() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    const section = sectionRef.current;
    if (!section || event.pointerType !== "mouse") return;
    const rect = section.getBoundingClientRect();
    section.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    section.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <section ref={sectionRef} onPointerMove={handlePointerMove} className="hero relative overflow-hidden">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="hero-grid-glow pointer-events-none absolute inset-0 hidden lg:block" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_0%,rgb(91_155_255/0.10),transparent)]"
      />

      <div className="relative mx-auto max-w-[1120px] px-5 pt-24 pb-24 md:px-8 md:pt-32 md:pb-32 xl:px-0 xl:pt-40">
        <p className="font-mono text-xs font-medium tracking-[0.08em] text-slate uppercase">{t.hero.role}</p>

        <h1 className="mt-6 max-w-4xl text-[clamp(2.5rem,4vw+1rem,4.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          {t.hero.titleBefore}
          <span className="neon-word">{t.hero.titleAccent}</span>
          {t.hero.titleAfter}
        </h1>

        <p className="mt-8 max-w-[60ch] text-lg leading-relaxed">{t.hero.lead}</p>

        <p className="mt-8 inline-flex items-center gap-3 text-sm text-mist">
          <span className="status-dot h-2 w-2 rounded-full bg-neon-cyan" aria-hidden="true" />
          {t.hero.available}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link to={{ hash: "munkak" }} className={buttonPrimary}>
            {t.hero.primary}
          </Link>
          <Link to={{ hash: "kapcsolat" }} className={buttonSecondary}>
            {t.hero.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
