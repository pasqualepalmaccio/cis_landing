import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Access } from "@/components/sections/access";
import { Campus } from "@/components/sections/campus";
import { Curriculum } from "@/components/sections/curriculum";
import { Fees } from "@/components/sections/fees";
import { Hero } from "@/components/sections/hero";
import { Interest } from "@/components/sections/interest";
import { Philosophy } from "@/components/sections/philosophy";
import { Safety } from "@/components/sections/safety";
import { Timeline } from "@/components/sections/timeline";
import { Vision } from "@/components/sections/vision";
import { JsonLd } from "@/components/seo/json-ld";
import { getDict, isLang } from "@/content";
import { pageMetadata } from "@/lib/metadata";
import { schoolJsonLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "", getDict(lang).meta);
}

/* Statica: nessun dato a richiesta, si rigenera solo a ogni rilascio. Fondi
   delle sezioni alternati (bianco, avorio, blu) nell'ordine del prototipo. */
export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  return (
    <>
      <JsonLd data={schoolJsonLd(lang, t.meta.description)} />
      <Hero lang={lang} t={t.hero} ica={t.ica} />
      <Vision t={t.vision} />
      <Curriculum lang={lang} t={t.curriculum} ica={t.ica} />
      <Access t={t.access} />
      <Campus t={t.campus} />
      <Philosophy lang={lang} t={t.philosophy} />
      <Safety t={t.safety} />
      <Fees lang={lang} t={t.fees} />
      <Timeline t={t.timeline} />
      <Interest lang={lang} t={t.interest} />
    </>
  );
}
