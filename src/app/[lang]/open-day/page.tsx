import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OpenDayForm } from "@/components/form/open-day-form";
import { Container } from "@/components/layout/container";
import { Ages } from "@/components/open-day/ages";
import { Languages } from "@/components/open-day/languages";
import { OpenDayHero } from "@/components/open-day/open-day-hero";
import { Pillars } from "@/components/open-day/pillars";
import { JsonLd } from "@/components/seo/json-ld";
import { isLang, type Lang } from "@/content";
import { fill, OPEN_DAY_ENABLED, openDayCopy, type OpenDayCopy } from "@/content/open-day";
import { pageMetadata } from "@/lib/metadata";
import { loadEvent } from "@/lib/open-day/event";
import { openDayJsonLd } from "@/lib/structured-data";

/* I posti cambiano: la pagina si rigenera al massimo ogni 60 secondi. Chi
   decide il posto è l'iscrizione, non questa pagina. */
export const revalidate = 60;

export async function generateMetadata({ params }: PageProps<"/[lang]/open-day">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return pageMetadata(lang, "/open-day", openDayCopy[lang].meta);
}

export default async function OpenDayPage({ params }: PageProps<"/[lang]/open-day">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = openDayCopy[lang];
  const state = await loadEvent();

  /* Hero, perché partecipare, lingue (Blu Lario), fasce d'età, iscrizione.
     L'iscrizione resta sul fondo scuro per cui il modulo è disegnato. */
  return (
    <>
      {state.kind === "ok" && <JsonLd data={openDayJsonLd(lang, state.event, t.meta.description)} />}
      <OpenDayHero lang={lang} t={t} state={state} />
      <Pillars t={t} />
      <Languages t={t} />
      <Ages t={t} />
      <section id="iscrizione" className="bg-navy-900 pt-12 md:pt-24">
        <Container>
          <EventBlock lang={lang} t={t} state={state} />
        </Container>
      </section>
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
