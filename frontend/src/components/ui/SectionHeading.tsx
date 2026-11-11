// Szekciócím: kódkomment stílusú mono címke (pl. „// munkáim”), H2 és opcionális bevezető.
// A statement változat egy nagy, kijelentő mondat a szokásos cím helyett (pl. a Rólam fő mondata).
// Görgetéskor úszik be (data-reveal, scripts/reveal.ts).

interface Props {
  eyebrow: string;
  title: string;
  lead?: string;
  statement?: boolean;
}

export function SectionHeading({ eyebrow, title, lead, statement = false }: Props) {
  return (
    <div data-reveal className={statement ? "max-w-4xl" : "max-w-2xl"}>
      <p className="font-mono text-sm text-slate">
        <span aria-hidden="true" className="text-signal-blue">
          {"// "}
        </span>
        {eyebrow}
      </p>
      <h2
        className={
          statement
            ? "mt-4 text-[clamp(1.75rem,2.8vw+1rem,3.25rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance"
            : "mt-4 text-[clamp(1.75rem,2vw+1rem,2.5rem)] leading-[1.15] font-semibold tracking-[-0.02em]"
        }
      >
        {title}
      </h2>
      {lead && <p className="mt-4 text-mist">{lead}</p>}
    </div>
  );
}
