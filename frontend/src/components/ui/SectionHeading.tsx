// Szekciócím: kódkomment stílusú mono címke (pl. „// munkáim”), H2 és opcionális bevezető. Minden kezdőlapi
// szekció ezt használja, így a címek mérete mindenhol egyforma (DESIGN.md 3. pont, H2).
// A more egy link a cím mellett jobbra (pl. „Minden munkám (6) →” a Minden projektem oldalra), telefonon alatta.
// Görgetéskor úszik be (data-reveal, scripts/reveal.ts).

interface Props {
  eyebrow: string;
  title: string;
  lead?: string;
  more?: { href: string; label: string };
}

export function SectionHeading({ eyebrow, title, lead, more }: Props) {
  return (
    <div data-reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
      <div className="max-w-2xl">
        <p className="font-mono text-sm text-slate">
          <span aria-hidden="true" className="text-signal-blue">
            {"// "}
          </span>
          {eyebrow}
        </p>
        <h2 className="mt-4 text-[clamp(1.75rem,2vw+1rem,2.5rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance">{title}</h2>
        {lead && <p className="mt-4 text-mist">{lead}</p>}
      </div>
      {more && (
        <a href={more.href} className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-signal-blue underline-offset-4 lg:hover:underline">
          {more.label}
          <span aria-hidden="true" className="transition-transform lg:group-hover:translate-x-0.5">
            →
          </span>
        </a>
      )}
    </div>
  );
}
