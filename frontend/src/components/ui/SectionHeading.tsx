// Szekciócím: kódkomment stílusú mono címke (pl. „// munkáim”), H2 és opcionális bevezető.
// Görgetéskor úszik be (data-reveal, utils/reveal.ts).

interface Props {
  eyebrow: string;
  title: string;
  lead?: string;
}

export function SectionHeading({ eyebrow, title, lead }: Props) {
  return (
    <div data-reveal className="max-w-2xl">
      <p className="font-mono text-sm text-slate">
        <span aria-hidden="true" className="text-signal-blue">
          {"// "}
        </span>
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[clamp(1.75rem,2vw+1rem,2.5rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
        {title}
      </h2>
      {lead && <p className="mt-4 text-mist">{lead}</p>}
    </div>
  );
}
