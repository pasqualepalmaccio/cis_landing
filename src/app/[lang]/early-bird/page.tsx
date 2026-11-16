import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { earlyBirdVars } from "@/components/early-bird/amounts";
import { EarlyBirdBanner } from "@/components/early-bird/banner";
import { EarlyBirdConditions } from "@/components/early-bird/conditions";
import { Hero } from "@/components/sections/hero";
import { HomeBody } from "@/components/sections/home-body";
import { getDict, isLang } from "@/content";
import { EARLY_BIRD, earlyBirdCopy } from "@/content/early-bird";
import { fill } from "@/content/open-day";
import { pageMetadata } from "@/lib/metadata";

/* La pagina early bird è il sito principale con un'apertura che annuncia
   l'offerta, le condizioni subito dopo e un banner prima delle rette. Il
   resto (curricolo, sede, rette, percorso) è lo stesso della home.
   Finché è un'anteprima è fuori dai motori di ricerca. */
export async function generateMetadata({ params }: PageProps<"/[lang]/early-bird">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const meta = pageMetadata(lang, "/early-bird", earlyBirdCopy[lang].meta);
  return EARLY_BIRD.PREVIEW ? { ...meta, robots: { index: false, follow: false } } : meta;
}

export default async function EarlyBirdPage({ params }: PageProps<"/[lang]/early-bird">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  const eb = earlyBirdCopy[lang];
  const vars = earlyBirdVars(lang);
  const hero = { ...t.hero, ...eb.hero, eyebrow: fill(eb.hero.eyebrow, vars), titleLines: [...eb.hero.titleLines] };

  return (
    <>
      <Hero lang={lang} t={hero} ica={t.ica} ctaHref="#early-bird" />
      <EarlyBirdConditions t={eb} vars={vars} />
      <HomeBody lang={lang} t={t} beforeFees={<EarlyBirdBanner t={eb.banner} vars={vars} />} />
    </>
  );
}
