import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Hero } from "@/components/sections/hero";
import { HomeBody } from "@/components/sections/home-body";
import { JsonLd } from "@/components/seo/json-ld";
import { getDict, isLang } from "@/content";
import { pageMetadata } from "@/lib/metadata";
import { schoolJsonLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "", getDict(lang).meta);
}

/* Statica: nessun dato a richiesta, si rigenera solo a ogni rilascio. */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  return (
    <>
      <JsonLd data={schoolJsonLd(lang, t.meta.description)} />
      <Hero lang={lang} t={t.hero} ica={t.ica} />
      <HomeBody lang={lang} t={t} />
    </>
  );
}
