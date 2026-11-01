import type { Lang } from "@/content";
import type { OpenDayCopy } from "@/content/open-day";
import type { EventState } from "@/lib/open-day/event";

import { Container } from "../layout/container";
import { Reveal } from "../motion/reveal";
import { SplitWords } from "../motion/split-words";
import { ButtonLink } from "../ui/button-link";
import { EventStrip } from "./event-strip";

/* Apertura su Blu Lario sfumato verso l'Inchiostro: la barra in cima è
   fissa e trasparente, quindi il fondo scuro parte da sotto di lei e i testi
   bianchi della barra restano leggibili. Titolo sempre su due righe. */
export function OpenDayHero({ lang, t, state }: { lang: Lang; t: OpenDayCopy; state: EventState }) {
  return (
    <header className="tone-navy relative isolate overflow-hidden bg-[linear-gradient(165deg,var(--color-navy-900),var(--color-navy-950))] pb-12 pt-36 md:pb-24 md:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_10%,color-mix(in_oklab,var(--color-gold-500)_18%,transparent),transparent_70%)]" />
      <Container>
        <Reveal y={12}>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-gold-300/40 bg-white/8 px-4.5 py-2">
            <span className="relative flex size-2">
              <span aria-hidden className="absolute -inset-1.5 rounded-full border border-gold-500 opacity-0 motion-safe:animate-ping-slow" />
              <span className="size-2 rounded-full bg-gold-500" />
            </span>
            <span className="font-label text-xs uppercase tracking-[0.12em] text-gold-300">{t.eyebrow}</span>
          </p>
        </Reveal>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.1]">
          <SplitWords lines={[t.title, t.titleEm]} immediate delay={0.1} />
        </h1>
        <Reveal delay={0.4}>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-fg-muted">{t.lead}</p>
          <div className="mb-10 mt-8">
            <ButtonLink href="#iscrizione" arrow>
              {t.cta}
            </ButtonLink>
          </div>
        </Reveal>
        {state.kind === "ok" && (
          <Reveal delay={0.55}>
            <EventStrip lang={lang} t={t.strip} event={state.event} />
          </Reveal>
        )}
      </Container>
    </header>
  );
}
