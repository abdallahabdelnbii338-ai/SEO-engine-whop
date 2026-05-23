/** Origins allowed to embed this app (Whop Website Embed + local dev). */
const WHOP_FRAME_ANCESTORS = [
  "'self'",
  "https://whop.com",
  "https://www.whop.com",
  "https://*.whop.com",
] as const;

const DEV_FRAME_ANCESTORS = ["http://localhost:*", "http://127.0.0.1:*"] as const;

export function getFrameAncestorsDirective(): string {
  const ancestors =
    process.env.NODE_ENV === "development"
      ? [...WHOP_FRAME_ANCESTORS, ...DEV_FRAME_ANCESTORS]
      : [...WHOP_FRAME_ANCESTORS];

  return `frame-ancestors ${ancestors.join(" ")}`;
}

/** CSP value for next.config / proxy — frame embedding only (does not lock down script-src). */
export function getWhopEmbedCspValue(): string {
  return `${getFrameAncestorsDirective()};`;
}

/**
 * Allow Whop Website Embed: remove X-Frame-Options and set frame-ancestors.
 * X-Frame-Options DENY/SAMEORIGIN blocks embedding even when CSP would allow it.
 */
export function applyWhopEmbedHeaders(headers: Headers): void {
  headers.delete("X-Frame-Options");
  headers.delete("x-frame-options");
  headers.set("Content-Security-Policy", getWhopEmbedCspValue());
}
