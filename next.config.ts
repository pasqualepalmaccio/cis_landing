import type { NextConfig } from "next";

import { NOINDEX_HOST } from "./src/lib/seo";

const isProd = process.env.NODE_ENV === "production";

/* Di base tutto dalla stessa origine, font compresi (next/font li serve da qui).
   Google e Meta entrano nella CSP solo se il loro ID è configurato: il
   browser li contatta comunque solo dopo il consenso (ConsentTags). Le
   violazioni arrivano a /api/csp-report. */
const google = Boolean(process.env.NEXT_PUBLIC_GA4_ID || process.env.NEXT_PUBLIC_GADS_ID);
const meta = Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID);
const googleHosts = google
  ? "https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://www.googleadservices.com https://www.google.com https://www.google.it"
  : "";
const metaHosts = meta ? "https://connect.facebook.net https://www.facebook.com" : "";
const thirdParty = [googleHosts, metaHosts].filter(Boolean).join(" ");
const frames = [google && "https://www.googletagmanager.com https://td.doubleclick.net", meta && "https://www.facebook.com"].filter(Boolean).join(" ");

const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' ${thirdParty}`.trim(),
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: ${thirdParty}`.trim(),
  "font-src 'self'",
  `connect-src 'self' ${thirdParty}`.trim(),
  `frame-src 'self' ${frames}`.trim(),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "report-uri /api/csp-report",
].join("; ");

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  experimental: { globalNotFound: true },
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    /* Gli indirizzi del sito precedente restano validi: link condivisi,
       segnalibri, risultati di ricerca. */
    const legacy = [
      { from: "index.html", to: "" },
      { from: "curricolo.html", to: "/curricolo" },
      { from: "registrazione.html", to: "/registrazione" },
    ];
    return [
      ...legacy.map((l) => ({
        source: `/${l.from}`,
        has: [{ type: "query" as const, key: "lang", value: "en" }],
        destination: `/en${l.to}`,
        permanent: true,
      })),
      ...legacy.map((l) => ({ source: `/${l.from}`, destination: `/it${l.to}`, permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          ...(isProd ? [{ key: "Content-Security-Policy", value: csp }] : []),
        ],
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: NOINDEX_HOST }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
