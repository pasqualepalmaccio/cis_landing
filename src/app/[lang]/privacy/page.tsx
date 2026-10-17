import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHead } from "@/components/layout/page-head";

import { LegalSections } from "@/components/legal/legal-sections";
import { isLang } from "@/content";
import { getLegal } from "@/content/legal";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getLegal(lang).privacy.meta;
  return { title: t.title, description: t.description, alternates: { languages: { it: "/it/privacy", en: "/en/privacy" } } };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const legal = getLegal(lang);
  const t = legal.privacy;
  return (
    <>
      <PageHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <Container>
        <LegalSections sections={t.sections} updated={legal.updated} draftNotice={legal.draftNotice} />
      </Container>
    </>
  );
}
