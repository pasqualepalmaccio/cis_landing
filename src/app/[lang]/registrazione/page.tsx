import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RegistrationForm } from "@/components/form/registration-form";
import { Container } from "@/components/layout/container";
import { PageHead } from "@/components/layout/page-head";
import { Reveal } from "@/components/motion/reveal";
import { isLang } from "@/content";
import { registrationCopy } from "@/content/registration";

export async function generateMetadata({ params }: PageProps<"/[lang]/registrazione">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = registrationCopy[lang].meta;
  return { title: t.title, description: t.description, alternates: { languages: { it: "/it/registrazione", en: "/en/registrazione" } } };
}

export default async function RegistrationPage({ params }: PageProps<"/[lang]/registrazione">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = registrationCopy[lang];

  return (
    <>
      <PageHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <Container>
        <Reveal className="mb-8 rounded-3xl border border-line bg-gradient-to-br from-navy-800 to-navy-900 p-8">
          <h2 className="font-display text-2xl text-gold-300">{t.why.title}</h2>
          <ul className="mt-5 space-y-2 text-mist">
            {t.why.items.map((item) => (
              <li key={item} className="relative pl-6">
                <span className="absolute left-0 text-gold-500">✦</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-line pt-5 text-sm italic text-mist">{t.why.caveat}</p>
        </Reveal>
        <RegistrationForm lang={lang} t={t} />
      </Container>
    </>
  );
}
