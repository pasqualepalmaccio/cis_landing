import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OpenDayForm } from "@/components/form/open-day-form";
import { Container } from "@/components/layout/container";
import { PageHead } from "@/components/layout/page-head";
import { Reveal } from "@/components/motion/reveal";
import { isLang, type Lang } from "@/content";
import { fill, OPEN_DAY_ENABLED, openDayCopy, type OpenDayCopy } from "@/content/open-day";
import { loadEvent } from "@/lib/open-day/event";

/* I posti cambiano: la pagina si rigenera al massimo ogni 60 secondi. Chi
   decide il posto è l'iscrizione, non questa pagina. */
export const revalidate = 60;

export async function generateMetadata({ params }: PageProps<"/[lang]/open-day">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = openDayCopy[lang].meta;
  return { title: t.title, description: t.description, alternates: { languages: { it: "/it/open-day", en: "/en/open-day" } } };
}

export default async function OpenDayPage({ params }: PageProps<"/[lang]/open-day">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = openDayCopy[lang];
  const state = await loadEvent();

  return (
    <>
      <PageHead eyebrow={t.eyebrow} title={t.title} titleEm={t.titleEm} lead={t.lead} />
      <Container>
        <Reveal className="grid gap-4 sm:grid-cols-2">
          {t.pillars.map((p) => (
            <div key={p.title} className="rounded-3xl border border-line border-l-4 border-l-gold-500 bg-cream/[0.03] p-7">
              <h2 className="font-display text-2xl text-cream">{p.title}</h2>
              <p className="mt-2 text-mist">{p.body}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10 grid gap-8 rounded-3xl border border-line bg-gradient-to-br from-navy-800 to-navy-900 p-8 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="font-label text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">{t.languagesTitle}</h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {t.languages.map((l) => (
                <li key={l} className="rounded-full border border-bordeaux bg-bordeaux/20 px-5 py-2.5 text-sm font-semibold text-cream">{l}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm italic text-mist">{t.opening}</p>
          </div>
          <div>
            <h2 className="font-label text-sm font-semibold uppercase tracking-[0.18em] text-gold-300">{t.agesTitle}</h2>
            <table className="mt-5 w-full text-left text-sm">
              <thead className="text-mist">
                <tr>{t.agesHead.map((h) => <th key={h} className="border-b border-line py-2 pr-4 font-semibold">{h}</th>)}</tr>
              </thead>
              <tbody>
                {t.ages.map((row) => (
                  <tr key={row[0]}>{row.map((c, i) => <td key={i} className="border-b border-line/50 py-2 pr-4 text-cream/90">{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        <section id="iscrizione" className="mt-16">
          <EventBlock lang={lang} t={t} state={state} />
        </section>
      </Container>
    </>
  );
}

function Message({ title, body, lang, t, link }: { title: string; body: string; lang: Lang; t: OpenDayCopy; link?: boolean }) {
  return (
    <div role="status" className="mb-24 rounded-2xl border border-gold-500 bg-gold-500/10 p-6">
      <p className="font-semibold text-gold-300">{title}</p>
      <p className="mt-1 text-cream/90">
        {body}{" "}
        <a href="mailto:info@cis-colico.com" className="font-semibold text-gold-300 underline underline-offset-4">info@cis-colico.com</a>
      </p>
      {link ? <Link href={`/${lang}/registrazione`} className="mt-4 inline-flex rounded-full bg-cta px-6 py-3 font-bold text-navy-900 hover:bg-cta-hover">{t.preRegistration}</Link> : null}
    </div>
  );
}

function EventBlock({ lang, t, state }: { lang: Lang; t: OpenDayCopy; state: Awaited<ReturnType<typeof loadEvent>> }) {
  if (state.kind === "unpublished") return <Message {...t.states.unpublished} lang={lang} t={t} link />;
  if (state.kind === "unavailable") return <Message {...t.states.unavailable} lang={lang} t={t} />;
  const { event } = state;
  if (event.status === "closed" || event.sessions.every((s) => s.started)) return <Message {...t.states.closed} lang={lang} t={t} />;
  const updated = new Intl.DateTimeFormat(lang === "it" ? "it-IT" : "en-GB", { timeZone: "Europe/Rome", hour: "2-digit", minute: "2-digit" }).format(new Date(event.generatedAt));

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] leading-tight text-cream">{event.title[lang]}</h2>
        <p className="mt-2 text-lg text-mist">{event.place}</p>
        <p className="mt-2 text-xs text-mist">{fill(t.sessions.updated, { time: updated })}</p>
      </div>
      {OPEN_DAY_ENABLED ? null : (
        <div role="status" className="mt-6 rounded-2xl border border-gold-500 bg-gold-500/10 p-5 text-sm">
          <p className="font-semibold text-gold-300">{t.states.disabled.title}</p>
          <p className="mt-1 text-cream/90">
            {t.states.disabled.body}{" "}
            <a href="mailto:info@cis-colico.com" className="font-semibold text-gold-300 underline underline-offset-4">info@cis-colico.com</a>.
          </p>
        </div>
      )}
      <OpenDayForm lang={lang} t={t} sessions={event.sessions} />
    </>
  );
}
