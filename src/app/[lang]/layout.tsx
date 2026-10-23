import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { notFound } from "next/navigation";

import { ConsentBanner } from "@/components/consent/consent-banner";
import { CONSENT_DEFAULTS_SCRIPT, ConsentTags } from "@/components/consent/consent-tags";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { getDict, isLang, LANGS } from "@/content";
import { TRACKING_ENABLED } from "@/lib/consent/config";

import "../globals.css";

// Caratteri della guida di marca: Cormorant Garamond per titoli e citazioni,
// Cinzel per etichette brevi in maiuscolo, Source Sans 3 per testo e moduli.
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const cinzel = Cinzel({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-cinzel", display: "swap" });
const sourceSans = Source_Sans_3({ subsets: ["latin", "cyrillic"], variable: "--font-source-sans", display: "swap" });

export const viewport: Viewport = { themeColor: "#1c3f72" };

export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang);
  return {
    metadataBase: new URL(process.env.SITE_URL ?? "https://cis-colico.com"),
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { it: "/it", en: "/en" } },
    icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/brand/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", type: "image/png", sizes: "32x32" }], apple: "/apple-touch-icon.png" },
    openGraph: { title: t.meta.title, description: t.meta.description, images: ["/images/hero-lago.jpg"], locale: lang === "it" ? "it_IT" : "en_GB", type: "website" },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  return (
    <html lang={lang} className={`${cormorant.variable} ${cinzel.variable} ${sourceSans.variable}`} data-scroll-behavior="smooth">
      {/* Senza tag configurati il sito non usa cookie facoltativi: niente banner, niente script (I6). */}
      {TRACKING_ENABLED && (
        <head>
          <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS_SCRIPT }} />
        </head>
      )}
      <body className="bg-navy-900 font-sans text-cream antialiased">
        <ScrollProgress />
        <SiteNav lang={lang} t={t.nav} />
        <main className="overflow-x-clip">{children}</main>
        <SiteFooter lang={lang} t={t.footer} legal={t.legal} />
        {TRACKING_ENABLED && (
          <>
            <ConsentBanner lang={lang} t={t.consent} />
            <ConsentTags />
          </>
        )}
      </body>
    </html>
  );
}
