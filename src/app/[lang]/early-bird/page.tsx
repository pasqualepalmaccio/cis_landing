import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { Rich } from "@/components/rich";
import { Eyebrow } from "@/components/section-head";
import { CARD } from "@/components/ui/card";
import { isLang, type Lang } from "@/content";
import { EARLY_BIRD, earlyBirdCopy, type EarlyBirdCopy } from "@/content/early-bird";
import { fill } from "@/content/open-day";
import { euro } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";

/* Le condizioni early bird. Finché è un'anteprima (EARLY_BIRD.PREVIEW) la
   pagina non è collegata dal sito, è fuori dai motori di ricerca e lo dice
   in cima. Il modulo di pre-prenotazione non c'è ancora: lo annuncia. */
export async function generateMetadata({ params }: PageProps<"/[lang]/early-bird">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const meta = pageMetadata(lang, "/early-bird", earlyBirdCopy[lang].meta);
  return EARLY_BIRD.PREVIEW ? { ...meta, robots: { index: false, follow: false } } : meta;
}

const amounts = (lang: Lang) => ({
  prebooking: euro(EARLY_BIRD.prebooking, lang),
  combined: euro(EARLY_BIRD.combined, lang),
  places: EARLY_BIRD.places,
});

export default async function EarlyBirdPage({ params }: PageProps<"/[lang]/early-bird">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = earlyBirdCopy[lang];
  const vars = amounts(lang);

  return (
    <section className="tone-navy relative isolate overflow-hidden bg-[linear-gradient(165deg,var(--color-navy-900),var(--color-navy-950))] pb-16 pt-36 md:pb-24 md:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_10%,color-mix(in_oklab,var(--color-gold-500)_18%,transparent),transparent_70%)]" />
      <Container>
        {EARLY_BIRD.PREVIEW ? (
          <p role="note" className="mb-8 rounded-lg border border-gold-500/60 bg-gold-500/10 px-4 py-3 text-sm text-gold-300">
            {t.preview}
          </p>
        ) : null}
        <Reveal y={12}>
          <Eyebrow>{t.eyebrow}</Eyebrow>
        </Reveal>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.1]">
          <SplitWords lines={[t.title]} immediate delay={0.1} />
        </h1>
        <Reveal delay={0.3}>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-fg-muted">{t.lead}</p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {t.offers.map((o, i) => (
            <Reveal key={o.value} delay={0.15 + i * 0.1}>
              <Offer offer={o} vars={vars} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <How t={t} vars={vars} />
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-10 text-center">
            <p className="font-label text-sm font-semibold uppercase tracking-[0.06em] text-gold-300">{t.soon}</p>
            <p className="mt-3 text-fg-muted">
              {t.questions}{" "}
              <a href="mailto:info@cis-colico.com" className="font-semibold text-gold-300 underline underline-offset-4">info@cis-colico.com</a>
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

type Vars = ReturnType<typeof amounts>;

function Offer({ offer, vars }: { offer: EarlyBirdCopy["offers"][number]; vars: Vars }) {
  return (
    <article className={`h-full border-t-4 border-t-gold-500 p-7 ${CARD}`}>
      <p className="font-display text-5xl font-semibold leading-none text-bordeaux">{offer.value}</p>
      <h2 className="mt-3 font-display text-xl font-semibold leading-snug text-heading">{offer.title}</h2>
      <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{fill(offer.body, vars)}</p>
    </article>
  );
}

function How({ t, vars }: { t: EarlyBirdCopy; vars: Vars }) {
  return (
    <section aria-labelledby="come" className="mt-6 rounded-xl bg-bordeaux p-7 shadow-float sm:p-10">
      <p className="font-label text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">{t.how.eyebrow}</p>
      <h2 id="come" className="mt-3 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-tight text-white">{fill(t.how.title, vars)}</h2>
      <ul className="mt-5 space-y-3 text-[15.5px] leading-relaxed text-white/90 [&_strong]:text-white">
        {t.how.points.map((p) => (
          <li key={p}>
            <Rich text={fill(p, vars)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
