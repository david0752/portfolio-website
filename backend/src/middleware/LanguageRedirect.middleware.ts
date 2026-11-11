/**
 * Automatikus nyelv: aki nem magyar nyelvű böngészővel érkezik egy magyar oldalra, az angol párjára kerül.
 * A böngésző nyelvi beállítását (Accept-Language fejléc) olvassa, semmit nem tárol (nincs süti).
 *
 * Mikor NEM irányít át:
 * - ha a böngésző nyelvei között a magyar is szerepel;
 * - ha nincs Accept-Language fejléc vagy a kérés robottól jön (keresők, megosztási előnézetek): így a magyar oldalak
 *   továbbra is bekerülnek a keresőkbe, és a megosztott magyar link magyar előnézetet kap;
 * - ha a látogató az oldalon belülről érkezik (Referer a saját domain): így aki a nyelvváltóval magyarra vált, vagy már
 *   magyarul böngészik, az ott is marad, süti nélkül.
 * Csak a magyar oldalakra fut (wrangler.jsonc run_worker_first), az angol oldalakhoz nem nyúl.
 */

const BOT = /bot|crawl|spider|slurp|facebookexternalhit|embed|preview|lighthouse/i;

// A magyar oldal angol párja (a frontend i18n/index.ts útvonalaival egyezzen); ismeretlen címre null.
export function englishPath(pathname: string): string | null {
  if (pathname === "/") return "/en/";
  if (pathname === "/adatvedelem" || pathname === "/adatvedelem/") return "/en/privacy/";
  const work = /^\/munkak(\/.*)?$/.exec(pathname);
  if (work) return `/en/work${work[1] ?? "/"}`;
  return null;
}

// Szerepel-e a magyar a böngésző nyelvei között (pl. „en-US,en;q=0.9,hu;q=0.8”), 0-nál nagyobb súllyal.
export function acceptsHungarian(acceptLanguage: string): boolean {
  return acceptLanguage.split(",").some((part) => {
    const [tag, ...params] = part.trim().toLowerCase().split(";");
    const q = params.find((param) => param.trim().startsWith("q="));
    return (tag === "hu" || tag.startsWith("hu-")) && (!q || Number(q.trim().slice(2)) > 0);
  });
}

function isInternal(referer: string | null, origin: string): boolean {
  if (!referer) return false;
  try {
    return new URL(referer).origin === origin;
  } catch {
    return false;
  }
}

export function languageRedirect(request: Request): Response | null {
  if (request.method !== "GET" && request.method !== "HEAD") return null;
  const url = new URL(request.url);
  const target = englishPath(url.pathname);
  const acceptLanguage = request.headers.get("Accept-Language");
  if (!target || !acceptLanguage || acceptsHungarian(acceptLanguage)) return null;
  if (BOT.test(request.headers.get("User-Agent") ?? "")) return null;
  if (isInternal(request.headers.get("Referer"), url.origin)) return null;

  // 302: ideiglenes, a böngésző nem jegyzi meg (no-store), így a nyelvváltó után sem ragad be.
  return new Response(null, {
    status: 302,
    headers: { Location: `${target}${url.search}`, "Cache-Control": "no-store", Vary: "Accept-Language" },
  });
}
