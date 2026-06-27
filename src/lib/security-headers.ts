/**
 * Security Headers
 * Applied to every server response to harden the site against common web attacks.
 */

const isDev = process.env.NODE_ENV === "development";

export function applySecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);

  // Prevent clickjacking — disallows framing by any other site
  headers.set("X-Frame-Options", "DENY");

  // Prevent MIME type sniffing — browser must respect declared content-type
  headers.set("X-Content-Type-Options", "nosniff");

  // Control referrer information sent with requests
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Disable access to sensitive browser APIs
  headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  );

  // Force HTTPS for 1 year (only in production)
  if (!isDev) {
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }

  // XSS Protection header (legacy browsers)
  headers.set("X-XSS-Protection", "1; mode=block");

  // Content Security Policy
  // Allows: our own origin, Sanity CDN, Google Fonts, Trustindex, WhatsApp, Facebook, Instagram
  const csp = [
    "default-src 'self'",
    // Scripts: self + Trustindex widget
    "script-src 'self' 'unsafe-inline' https://cdn.trustindex.io https://www.google.com https://www.gstatic.com",
    // Styles: self + Google Fonts + unsafe-inline (for TailwindCSS/framer-motion inline styles)
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    // Fonts: self + Google Fonts
    "font-src 'self' https://fonts.gstatic.com data:",
    // Images: self + Sanity CDN + data URIs (for inline SVGs) + any https
    "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io https:",
    // Media: self + Sanity CDN
    "media-src 'self' https://cdn.sanity.io https://*.sanity.io blob:",
    // Frames: Trustindex for reviews iframe, YouTube
    "frame-src https://cdn.trustindex.io https://www.youtube.com https://www.google.com",
    // Connect: self + Sanity API + Resend + WhatsApp
    "connect-src 'self' https://*.sanity.io https://api.sanity.io https://api.resend.com https://wa.me wss:",
    // Object: none (no plugins)
    "object-src 'none'",
    // Base URI: self only
    "base-uri 'self'",
    // Form actions: self only
    "form-action 'self'",
  ].join("; ");

  headers.set("Content-Security-Policy", csp);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
