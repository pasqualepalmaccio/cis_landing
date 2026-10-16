import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/* Tutto dalla stessa origine: font compresi (next/font li serve da qui), così
   nessun indirizzo del visitatore raggiunge terze parti. */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
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
    ];
  },
};

export default nextConfig;
