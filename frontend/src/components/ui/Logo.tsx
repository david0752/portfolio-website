/**
 * Logó: „SD” monogram lekerekített négyzetben (az S kék, a D fehér, rajzolt vonalakból, így nem függ
 * a betűtípustól), mellette a név. Ugyanez a jel a böngészőfül ikonja (public/favicon.svg).
 */

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" fill="#101a2e" stroke="#1c2a44" />
      <path
        d="M14.6 11.4c-.8-1-2-1.6-3.4-1.6-2 0-3.3 1.1-3.3 2.6 0 3.5 7 2 7 5.8 0 1.6-1.4 2.8-3.6 2.8-1.5 0-2.9-.6-3.8-1.7"
        fill="none"
        stroke="#5b9bff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M18 9.8v11.2h2.6a5.6 5.6 0 0 0 0-11.2z" fill="none" stroke="#e8eef8" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="text-[0.9375rem] font-semibold tracking-tight text-ice-white">Szántó Dávid</span>
    </span>
  );
}
