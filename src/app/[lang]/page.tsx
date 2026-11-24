import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EarlyBirdBanner } from "@/components/early-bird/banner";
import { Hero } from "@/components/sections/hero";
import { HomeBody } from "@/components/sections/home-body";
import { JsonLd } from "@/components/seo/json-ld";
import { getDict, isLang } from "@/content";
import { EARLY_BIRD_PATH, earlyBirdCopy, earlyBirdOnSite } from "@/content/early-bird";
import { earlyBirdVars } from "@/lib/early-bird/vars";
import { pageMetadata } from "@/lib/metadata";
import { schoolJsonLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "", getDict(lang).meta);
}

/* Statica: nessun dato a richiesta, si rigenera solo a ogni rilascio.
   Quando il sito richiama l'early bird (EARLY_BIRD.SITE_LINKS, spento il
   24/11), il comando dell'apertura porta alla sua pagina e sotto l'apertura
   c'è il suo banner. L'invito in fondo resta sulla registrazione, ma parla a chi entra
   dal 2028 (richiesta della scuola, 20/11). Si valuta al build: dopo la scadenza
   sparisce al primo rilascio successivo, la barra invece smette subito. */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  const eb = earlyBirdCopy[lang];
  const promo = earlyBirdOnSite();
  const ebHref = `/${lang}${EARLY_BIRD_PATH}`;
  return (
    <>
      <JsonLd data={schoolJsonLd(lang, t.meta.description)} />
      <Hero lang={lang} t={promo ? { ...t.hero, cta: eb.hero.cta } : t.hero} ica={t.ica} ctaHref={promo ? ebHref : undefined} />
      {promo && <EarlyBirdBanner t={eb.banner} vars={earlyBirdVars(lang)} href={ebHref} />}
      <HomeBody lang={lang} t={promo ? { ...t, interest: eb.interest } : t} />
    </>
  );
}
