/**
 * Biztonsági fejlécek a Worker által kiszolgált oldalakra. A frontend/public/_headers szabályait a Cloudflare csak a
 * közvetlenül kiszolgált statikus fájlokra teszi rá, a Workeren átmenő válaszokra nem (a magyar oldalak a nyelvi
 * átirányítás miatt a Workeren mennek át, wrangler.jsonc run_worker_first). A két lista egyezzen.
 */

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

export function withSecurityHeaders(response: Response): Response {
  const secured = new Response(response.body, response);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) secured.headers.set(name, value);
  return secured;
}
