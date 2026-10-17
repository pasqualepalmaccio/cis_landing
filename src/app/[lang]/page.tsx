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
import { getDict, isLang } from "@/content";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  return (
    <>
      <Hero lang={lang} t={t.hero} />
      <Vision t={t.vision} />
      <Curriculum lang={lang} t={t.curriculum} />
      <Access t={t.access} />
      <Campus t={t.campus} />
      <Philosophy t={t.philosophy} />
      <Safety t={t.safety} />
      <Fees lang={lang} t={t.fees} />
      <Timeline t={t.timeline} />
      <Interest lang={lang} t={t.interest} />
    </>
  );
}
