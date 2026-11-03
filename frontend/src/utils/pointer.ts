/**
 * Az egér helyét CSS-változókba (--mx, --my) írja az elemen, amin az esemény ül; a hero rács és a kártyák
 * egérkövető fénye (index.css) ebből dolgozik. Csak egérre, így érintésnél nincs felesleges munka.
 */

import type { PointerEvent } from "react";

export function trackPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== "mouse") return;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
}
