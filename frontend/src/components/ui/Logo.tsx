/**
 * Logó: a név nyelv szerinti sorrendben („Szántó.Dávid”, angolul „Dávid.Szántó”, content/site.ts OWNER), nagy kezdőbetűkkel, kék ponttal és egy villogó neon kurzorral a végén (terminál-hangulat).
 * A kurzor villogása az index.css .logo-cursor szabálya; csökkentett mozgásnál áll.
 * A böngészőfül ikonja ennek rövid változata: „sd_” (public/favicon.svg).
 */

import { OWNER } from "../../content/site.ts";
import type { Lang } from "../../i18n/index.ts";

export function Logo({ lang }: { lang: Lang }) {
  const [first, second] = OWNER.name[lang].split(" ");

  return (
    <span className="inline-flex items-baseline text-[1.0625rem] font-semibold tracking-[-0.03em] text-ice-white">
      {first}
      <span className="text-signal-blue">.</span>
      {second}
      <span aria-hidden="true" className="logo-cursor ml-[0.08em] inline-block h-[0.12em] w-[0.5em] bg-neon-cyan" />
    </span>
  );
}
