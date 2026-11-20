import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EarlyBirdBanner } from "@/components/early-bird/banner";
import { Hero } from "@/components/sections/hero";
import { HomeBody } from "@/components/sections/home-body";
import { JsonLd } from "@/components/seo/json-ld";
import { getDict, isLang } from "@/content";
import { EARLY_BIRD_PATH, earlyBirdCopy, earlyBirdOpen } from "@/content/early-bird";
import { earlyBirdVars } from "@/lib/early-bird/vars";
import { pageMetadata } from "@/lib/metadata";
import { schoolJsonLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "", getDict(lang).meta);
}

/* Statica: nessun dato a richiesta, si rigenera solo a ogni rilascio.
   Finché l'offerta early bird è aperta, sotto l'apertura c'è il suo banner
   (richiesta della scuola, 20/11). Si valuta al build: dopo la scadenza
   sparisce al primo rilascio successivo, la barra invece smette subito. */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  return (
    <>
      <JsonLd data={schoolJsonLd(lang, t.meta.description)} />
      <Hero lang={lang} t={t.hero} ica={t.ica} />
      {earlyBirdOpen() && <EarlyBirdBanner t={earlyBirdCopy[lang].banner} vars={earlyBirdVars(lang)} href={`/${lang}${EARLY_BIRD_PATH}`} />}
      <HomeBody lang={lang} t={t} />
    </>
  );
}
