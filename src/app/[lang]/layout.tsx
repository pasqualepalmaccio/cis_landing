import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNav } from "@/components/layout/site-nav";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { getDict, isLang, LANGS } from "@/content";

import "../globals.css";

const fraunces = Fraunces({ subsets: ["latin"], axes: ["opsz"], style: ["normal", "italic"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });

export const viewport: Viewport = { themeColor: "#0a1230" };

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
    icons: { icon: [{ url: "/favicon.ico", sizes: "any" }, { url: "/favicon-32.png", type: "image/png", sizes: "32x32" }], apple: "/apple-touch-icon.png" },
    openGraph: { title: t.meta.title, description: t.meta.description, images: ["/images/hero-lago.jpg"], locale: lang === "it" ? "it_IT" : "en_GB", type: "website" },
  };
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  return (
    <html lang={lang} className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-navy-900 font-sans text-cream antialiased">
        <SmoothScroll />
        <ScrollProgress />
        <SiteNav lang={lang} t={t.nav} />
        <main className="overflow-x-clip">{children}</main>
        <SiteFooter lang={lang} t={t.footer} />
      </body>
    </html>
  );
}
