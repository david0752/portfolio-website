/**
 * Kezdőlap nyitóblokkja: szerep, főcím, bemutatkozó mondat, „elérhető” pötty, két gomb; mellette (tableten
 * alatta, telefonon sehol) a kódablak a fejlesztő adataival (ui/CodeWindow.tsx).
 * A főcím első sora kék (signal-blue, ragyogás nélkül) szó, amely nagy képernyőn három szó között váltakozik gépelős (konzol)
 * animációval, villogó kurzorral (data-typewriter, utils/typewriter.ts). A HTML-ben az első szó áll,
 * a felolvasók az aria-label teljes mondatát kapják.
 * A blokk legalább a teljes képernyőt kitölti (a navbar alatt), a tartalma függőlegesen középen áll.
 * Háttér: halvány rács és egy kék radiális fény; nagy képernyőn a rács kéken felizzik az egér körül
 * (.hero-grid-glow, index.css). Statikus HTML-ként renderelődik (Astro), a böngészőben nem fut React.
 */

import { messages, type Lang } from "../i18n/index.ts";
import { buttonPrimary, buttonSecondary } from "./ui/Button.tsx";
import { CodeWindow } from "./ui/CodeWindow.tsx";

export function Hero({ lang }: { lang: Lang }) {
  const t = messages(lang);
  const words = t.hero.titleWords;

  return (
    <section data-pointer className="hero relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden lg:min-h-[calc(100dvh-5rem)]">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="hero-grid-glow pointer-events-none absolute inset-0 hidden lg:block" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_0%,rgb(91_155_255/0.10),transparent)]"
      />

      <div className="relative mx-auto grid w-full max-w-[1120px] items-center gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-12 lg:gap-10 lg:pb-28 xl:px-0">
        <div className="lg:col-span-7">
          <p className="font-mono text-sm text-slate">
            <span aria-hidden="true" className="text-signal-blue">
              {"// "}
            </span>
            {t.hero.role}
          </p>

          <h1
            aria-label={`${words.join(", ")} – ${t.hero.titleRest}`}
            className="mt-6 text-[clamp(2.5rem,3vw+1rem,3.75rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
          >
            <span className="block text-signal-blue lg:whitespace-nowrap">
              <span data-typewriter={JSON.stringify(words)}>{words[0]}</span>
              <span aria-hidden="true" className="logo-cursor ml-[0.06em] inline-block h-[0.09em] w-[0.5em] bg-signal-blue" />
            </span>
            {t.hero.titleRest}
          </h1>

          <p className="mt-8 max-w-[60ch] text-lg leading-relaxed">{t.hero.lead}</p>

          <p className="mt-8 inline-flex items-center gap-3 text-sm text-mist">
            <span className="status-dot h-2 w-2 rounded-full bg-neon-cyan" aria-hidden="true" />
            {t.hero.available}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a href="#munkak" className={buttonPrimary}>
              {t.hero.primary}
            </a>
            <a href="#kapcsolat" className={buttonSecondary}>
              {t.hero.secondary}
            </a>
          </div>
        </div>

        {/* Telefonon nincs kódablak: ott csak hosszabbá tenné a nyitóblokkot. */}
        <div className="hidden md:block lg:col-span-5">
          <CodeWindow lang={lang} />
        </div>
      </div>
    </section>
  );
}
