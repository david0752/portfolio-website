// Szekciócím: kis mono címke (pl. „01 / Munkák”), H2 és opcionális bevezető.

interface Props {
  eyebrow: string;
  title: string;
  lead?: string;
}

export function SectionHeading({ eyebrow, title, lead }: Props) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs font-medium tracking-[0.08em] text-slate uppercase">{eyebrow}</p>
      <h2 className="mt-4 text-[clamp(1.75rem,2vw+1rem,2.5rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
        {title}
      </h2>
      {lead && <p className="mt-4 text-mist">{lead}</p>}
    </div>
  );
}
