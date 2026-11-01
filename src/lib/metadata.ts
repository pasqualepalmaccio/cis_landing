import type { Metadata } from "next";

import { LANGS, type Lang } from "@/content";

/* Metadati di una pagina bilingue: canonical, hreflang reciproci con
   x-default sull'italiano, Open Graph e scheda per le anteprime. Gli
   indirizzi sono relativi: li completa metadataBase (SITE_URL) nel layout,
   così canonical e og:url seguono il dominio di produzione e non quello di
   anteprima, che è fuori dai motori di ricerca (seo.ts). */
export const SITE_NAME = "CIS · Colico International School";
/** Dominio di produzione: base di canonical, og:url e dati strutturati. */
export const SITE_URL = new URL(process.env.SITE_URL ?? "https://cis-colico.com");
const IMAGE = "/images/hero-lago.jpg";
const OG_LOCALE: Record<Lang, string> = { it: "it_IT", en: "en_GB" };

export function pageMetadata(lang: Lang, path: string, { title, description }: { title: string; description: string }): Metadata {
  const url = `/${lang}${path}`;
  const languages = Object.fromEntries([...LANGS.map((l) => [l, `/${l}${path}`]), ["x-default", `/it${path}`]]);
  return {
    title,
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      url,
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: [{ url: IMAGE, width: 1537, height: 1023, alt: SITE_NAME }],
    },
    twitter: { card: "summary_large_image", title, description, images: [IMAGE] },
  };
}

/** Indirizzo assoluto per i dati strutturati, che non passano da metadataBase. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
