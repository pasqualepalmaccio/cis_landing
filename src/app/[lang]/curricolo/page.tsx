import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { PageHead } from "@/components/layout/page-head";
import { Reveal } from "@/components/motion/reveal";
import { Rich } from "@/components/rich";
import { CardList } from "@/components/sections/card-list";
import { Eyebrow } from "@/components/section-head";
import { getDict, isLang } from "@/content";

export async function generateMetadata({ params }: PageProps<"/[lang]/curricolo">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang).curriculumPage.meta;
  return { title: t.title, description: t.description, alternates: { languages: { it: "/it/curricolo", en: "/en/curricolo" } } };
}

function Block({ kicker, title, lead, children }: { kicker: string; title: string; lead?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-20 sm:py-28">
      <Reveal className="mb-12 max-w-3xl">
        <Eyebrow>{kicker}</Eyebrow>
        <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3.2rem)] leading-[1.05]">{title}</h2>
        {lead && <p className="mt-5 text-lg leading-relaxed text-mist">{lead}</p>}
      </Reveal>
      {children}
    </section>
  );
}

function Card({ title, items = [], paragraphs = [], className = "" }: { title?: string; items?: string[]; paragraphs?: string[]; className?: string }) {
  return (
    <div className={`h-full rounded-3xl border border-line bg-navy-800/70 p-8 ${className}`}>
      {title && <h3 className="mb-5 font-display text-2xl text-gold-300">{title}</h3>}
      {items.length > 0 && <CardList items={items} />}
      <div className="space-y-4 text-[15px] leading-relaxed text-mist">
        {paragraphs.map((p) => (
          <p key={p}>
            <Rich text={p} />
          </p>
        ))}
      </div>
    </div>
  );
}

export default async function CurriculumPage({ params }: PageProps<"/[lang]/curricolo">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang).curriculumPage;

  return (
    <>
      <PageHead eyebrow={t.eyebrow} title={t.title} titleEm={t.titleEm} lead={t.lead} />
      <Container>
        <Block kicker={t.path.kicker} title={t.path.title}>
          <Reveal>
            <Card paragraphs={t.path.paragraphs} />
          </Reveal>
        </Block>

        <Block kicker={t.primary.kicker} title={t.primary.title} lead={t.primary.lead}>
          <Reveal className="mb-6 rounded-3xl border border-line bg-navy-800/70 p-8">
            <h3 className="font-display text-2xl text-gold-300">{t.primary.processTitle}</h3>
            <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {t.primary.steps.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.1} className="relative rounded-2xl border border-line bg-navy-900 p-5">
                  <span className="font-display text-5xl text-gold-500/30">{i + 1}</span>
                  <h4 className="mt-3 font-semibold">{s.title}</h4>
                  <p className="mt-1 text-sm text-mist">{s.body}</p>
                  {i < t.primary.steps.length - 1 && <span aria-hidden className="absolute -right-3 top-1/2 hidden text-gold-500 lg:block">→</span>}
                </Reveal>
              ))}
            </ol>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-2">
            {t.primary.cards.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.1}>
                <Card title={c.title} items={c.items} paragraphs={c.paragraphs} />
              </Reveal>
            ))}
          </div>
        </Block>

        <Block kicker={t.secondary.kicker} title={t.secondary.title} lead={t.secondary.lead}>
          <div className="grid gap-5 md:grid-cols-2">
            {t.secondary.cards.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 0.1} className={c.wide ? "md:col-span-2" : ""}>
                <Card title={c.title} items={c.items} paragraphs={c.paragraphs} />
              </Reveal>
            ))}
          </div>
        </Block>

        <Reveal className="rounded-[2rem] border border-gold-500 bg-gradient-to-br from-gold-500/15 to-transparent p-8 sm:p-12">
          <h3 className="font-display text-3xl text-gold-300">{t.why.title}</h3>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-mist">{t.why.body}</p>
        </Reveal>

        <Block kicker={t.after.kicker} title={t.after.title}>
          <div className="grid gap-5 md:grid-cols-2">
            {t.after.cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <Card title={c.title} paragraphs={[c.body]} />
              </Reveal>
            ))}
          </div>
        </Block>

        <Reveal className="pb-32 text-center">
          <Link href={`/${lang}/registrazione`} className="inline-flex rounded-full bg-gold-500 px-8 py-4 text-lg font-bold text-navy-900 transition-colors hover:bg-gold-300">
            {t.cta} →
          </Link>
        </Reveal>
      </Container>
    </>
  );
}
