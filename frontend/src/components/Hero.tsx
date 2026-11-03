/**
 * Kezdőlap nyitóblokkja: szerep, főcím egy neon szóval, bemutatkozó mondat, „elérhető” pötty, két gomb.
 * A háttérben egyetlen halvány kék radiális fény (DESIGN.md 2. pont).
 */

import { Link } from "react-router";

import { useI18n } from "../i18n/I18nProvider.tsx";
import { buttonPrimary, buttonSecondary } from "./ui/Button.tsx";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden">
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
