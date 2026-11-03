/**
 * Logó: „szántó.dávid” szövegjel kék ponttal és egy villogó neon kurzorral a végén (terminál-hangulat).
 * A kurzor villogása az index.css .logo-cursor szabálya; csökkentett mozgásnál áll.
 * A böngészőfül ikonja ennek rövid változata: „sd_” (public/favicon.svg).
 */

export function Logo() {
  return (
    <span className="inline-flex items-baseline text-[1.0625rem] font-semibold tracking-[-0.03em] text-ice-white">
      szántó<span className="text-signal-blue">.</span>dávid
      <span aria-hidden="true" className="logo-cursor ml-[0.08em] inline-block h-[0.12em] w-[0.5em] bg-neon-cyan" />
    </span>
  );
}
