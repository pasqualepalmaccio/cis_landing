import type { Dict } from "@/content";

import { Section } from "../layout/section";
import { Counter } from "../motion/counter";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";
import { CARD, CARD_LIFT } from "../ui/card";
import { IconBadge } from "../ui/icon-badge";
import { Icon } from "../ui/icons";

type Route = Dict["access"]["routes"][number];

/* «Tutte le strade portano a Colico»: in testa la meta, in Blu Lario con un
   anello che pulsa; poi le località, ognuna con i suoi mezzi. Le schede
   entrano una dopo l'altra. */
export function Access({ t }: { t: Dict["access"] }) {
  return (
    <Section id="accesso" tone="white">
      <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1.15fr_repeat(4,1fr)]">
        <Reveal className="sm:col-span-2 lg:col-span-1">
          <div className="tone-navy flex h-full flex-col items-center justify-center rounded-xl bg-navy-900 px-6 py-8 text-center">
            <span className="relative grid size-11 place-items-center rounded-full border-[1.5px] border-gold-300 bg-white/10 text-gold-300">
              <span aria-hidden className="absolute -inset-1.5 rounded-full border border-gold-300 opacity-60 motion-safe:animate-ping-slow" />
              <Icon name="compass" className="size-5.5" />
            </span>
            <p className="mt-4 font-display text-xl font-semibold">{t.destination.place}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.08em] text-fg-muted">{t.destination.note}</p>
          </div>
        </Reveal>
        {t.routes.map((r, i) => (
          <Reveal key={r.town} delay={(i + 1) * 0.08}>
            <Town route={r} modes={t.modes} />
          </Reveal>
        ))}
      </div>
      <Reveal>
        <p className="mt-6 max-w-3xl text-[13px] text-ink-faint">{t.note}</p>
      </Reveal>
    </Section>
  );
}

function Town({ route, modes }: { route: Route; modes: Dict["access"]["modes"] }) {
  return (
    <div className={`h-full px-6 py-8 text-center ${CARD} ${CARD_LIFT}`}>
      <IconBadge name="pin" size="sm" className="mx-auto" />
      <h3 className="mb-4 mt-3 font-display text-xl font-semibold text-heading">{route.town}</h3>
      <ul className="divide-y divide-rule">
        {route.ways.map((w) => (
          <li key={w.by + w.road} className="flex items-center gap-2 py-2.5 text-[12.5px] text-ink-faint">
            <Icon name={w.by} className="size-5 shrink-0 text-gold-500" />
            <span className="flex-1 text-left uppercase tracking-[0.04em]">
              {/* Con la strada scritta, il mezzo resta per chi non vede l'icona. */}
              {w.road ? (
                <>
                  <span className="sr-only">{modes[w.by]} · </span>
                  {w.road}
                </>
              ) : (
                modes[w.by]
              )}
            </span>
            <span className="whitespace-nowrap text-[13px] font-bold text-bordeaux">
              ~<Counter to={w.minutes} />
              min
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
