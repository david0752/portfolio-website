// Elsődleges és másodlagos gomb stílusa (DESIGN.md 6. pont). Link és gomb is használhatja a className-t.

export const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-signal-blue px-5 py-3 text-[0.9375rem] font-semibold text-midnight transition-colors duration-200 lg:hover:bg-signal-blue-hover active:bg-signal-blue-pressed disabled:cursor-not-allowed disabled:opacity-60";

export const buttonSecondary =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-line px-5 py-3 text-[0.9375rem] font-medium text-ice-white transition-colors duration-200 lg:hover:border-signal-blue";
