import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { PageHead } from "@/components/layout/page-head";
import { CookieTable } from "@/components/legal/cookie-table";
import { LegalSections } from "@/components/legal/legal-sections";
import { isLang } from "@/content";
import { getLegal } from "@/content/legal";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: PageProps<"/[lang]/cookie">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getLegal(lang).cookie.meta;
  return { title: t.title, description: t.description, alternates: { languages: { it: "/it/cookie", en: "/en/cookie" } } };
}

export default async function CookiePage({ params }: PageProps<"/[lang]/cookie">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const legal = getLegal(lang);
  const t = legal.cookie;
  return (
    <>
      <PageHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <Container>
        <CookieTable t={t.table} />
        <LegalSections sections={t.sections} updated={legal.updated} draftNotice={legal.draftNotice} />
      </Container>
    </>
  );
}
