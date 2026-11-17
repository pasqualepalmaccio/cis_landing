import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CheckInForm } from "@/components/form/check-in-form";
import { Container } from "@/components/layout/container";
import { isLang } from "@/content";
import { CHECK_IN_PATH, checkInCopy } from "@/content/check-in";
import { pageMetadata } from "@/lib/metadata";

/* La pagina che si apre dal QR all'ingresso del Meet & Discover CIS: solo il
   modulo di presenza. Fuori dai motori di ricerca e senza pixel (NO_PIXEL_PATHS).
   Record: docs/decisioni/2026-11-17-presenze-evento.md */

export async function generateMetadata({ params }: PageProps<"/[lang]/presenza">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { ...pageMetadata(lang, CHECK_IN_PATH, checkInCopy[lang].meta), robots: { index: false, follow: false } };
}

export default async function CheckInPage({ params }: PageProps<"/[lang]/presenza">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = checkInCopy[lang];
  return (
    <section className="tone-navy min-h-svh bg-[linear-gradient(165deg,var(--color-navy-900),var(--color-navy-950))] pb-16 pt-32 md:pt-40">
      <Container>
        <div className="max-w-xl">
          <p className="font-label text-xs uppercase tracking-[0.12em] text-gold-300">{t.eyebrow}</p>
          <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3.2rem)] font-semibold leading-[1.1] text-cream">
            {t.title} <span className="text-gold-300">{t.titleEm}</span>
          </h1>
          <p className="mb-8 mt-4 text-lg leading-relaxed text-mist">{t.lead}</p>
          <CheckInForm lang={lang} t={t} />
        </div>
      </Container>
    </section>
  );
}
