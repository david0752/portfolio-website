/**
 * Közös, az oldal stílusára szabott lenyíló választó a böngésző saját <select>-je helyett (annak a lenyíló listája
 * nem formázható). Gomb + lista (WAI-ARIA listbox minta): egérrel, érintéssel és billentyűzettel is kezelhető
 * (Enter / Szóköz / nyilak nyitják; nyilak, Home, End, betűk léptetnek; Enter választ; Esc és Tab bezár).
 * Mindig ezt kell használni, ha az oldalon lenyíló választó kell.
 */

import { useEffect, useId, useRef, useState, type KeyboardEvent, type Ref } from "react";

export interface SelectOption<T extends string> {
  value: T;
  label: string;
}

interface Props<T extends string> {
  label: string;
  value: T | "";
  options: SelectOption<T>[];
  placeholder: string;
  onChange: (value: T) => void;
  // Hiba esetén piros keret és a hibaszöveg a mező alatt.
  error?: string;
  buttonRef?: Ref<HTMLButtonElement>;
}

export function Select<T extends string>({ label, value, options, placeholder, onChange, error, buttonRef }: Props<T>) {
  const id = useId();
  const [open, setOpen] = useState(false);
  // A lista éppen kiemelt eleme (billentyűzettel vagy egérrel), az index az options tömbben.
  const [highlighted, setHighlighted] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : null;

  // Kattintás a választón kívül: bezár.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // A kiemelt elem mindig látható legyen a (görgethető) listában.
  useEffect(() => {
    if (!open) return;
    listRef.current?.children[highlighted]?.scrollIntoView({ block: "nearest" });
  }, [open, highlighted]);

  function openList() {
    setHighlighted(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function choose(index: number) {
    onChange(options[index].value);
    setOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;
    const keys: Record<string, () => void> = {
      ArrowDown: () => (open ? setHighlighted((i) => Math.min(i + 1, last)) : openList()),
      ArrowUp: () => (open ? setHighlighted((i) => Math.max(i - 1, 0)) : openList()),
      Home: () => open && setHighlighted(0),
      End: () => open && setHighlighted(last),
      Enter: () => (open ? choose(highlighted) : openList()),
      " ": () => (open ? choose(highlighted) : openList()),
      Escape: () => setOpen(false),
    };

    if (event.key === "Tab") {
      setOpen(false);
      return;
    }
    const action = keys[event.key];
    if (action) {
      event.preventDefault();
      action();
      return;
    }

    // Betű: a következő, ezzel kezdődő elemre ugrik (zárt állapotban ki is nyitja).
    if (event.key.length === 1 && /\S/.test(event.key)) {
      const letter = event.key.toLocaleLowerCase();
      const start = open ? highlighted + 1 : 0;
      const order = [...options.slice(start), ...options.slice(0, start)];
      const match = order.find((option) => option.label.toLocaleLowerCase().startsWith(letter));
      if (match) {
        setHighlighted(options.indexOf(match));
        if (!open) setOpen(true);
      }
    }
  }

  const listId = `${id}-list`;
  const optionId = (index: number) => `${id}-opt-${index}`;

  return (
    <div ref={rootRef} className="relative">
      <span id={`${id}-label`} className="block text-sm font-medium text-ice-white">
        {label}
      </span>
      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${id}-label`}
        aria-activedescendant={open ? optionId(highlighted) : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className={`mt-2 flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg border bg-card-navy px-4 py-3 text-left transition-colors focus:outline-none focus-visible:outline-2 focus-visible:outline-neon-cyan ${
          error ? "border-red-400/70" : open ? "border-signal-blue" : "border-line lg:hover:border-slate"
        }`}
      >
        <span className={selected ? "text-ice-white" : "text-slate"}>{selected ? selected.label : placeholder}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-slate transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={`${id}-label`}
        hidden={!open}
        className="absolute inset-x-0 z-20 mt-2 max-h-72 overflow-y-auto rounded-lg border border-line bg-card-navy p-1.5 shadow-xl shadow-black/40"
      >
        {options.map((option, index) => {
          const isSelected = option.value === value;
          return (
            <li
              key={option.value}
              id={optionId(index)}
              role="option"
              aria-selected={isSelected}
              onPointerEnter={() => setHighlighted(index)}
              // pointerdown helyett click: így érintőképernyőn görgetéskor nem választ véletlenül.
              onClick={() => choose(index)}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2.5 text-[0.9375rem] ${
                index === highlighted ? "bg-card-navy-hi" : ""
              } ${isSelected ? "text-signal-blue" : index === highlighted ? "text-ice-white" : "text-mist"}`}
            >
              {option.label}
              {isSelected && (
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12l5 5 9-10" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>

      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
