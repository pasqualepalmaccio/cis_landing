import type { Dict } from "@/content";

import { Container } from "../layout/container";
import { Counter } from "../motion/counter";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";

export function Access({ t }: { t: Dict["access"] }) {
  return (
    <section id="accesso" className="relative py-28 sm:py-40">
      <Container>
        <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
        <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.routes.map((r, i) => (
            <Reveal key={r.town} delay={i * 0.08} className="bg-navy-900">
              <div className="group relative h-full p-7 transition-colors duration-500 hover:bg-navy-800">
                <h3 className="font-display text-3xl">{r.town}</h3>
                <div className="mt-8 space-y-5">
                  {r.ways.map((w) => (
                    <div key={w.mode} className="border-t border-line pt-4">
                      <p className="text-xs uppercase tracking-[0.14em] text-mist">{w.mode}</p>
                      <p className="mt-1 font-display text-4xl text-gold-300">
                        ~<Counter to={w.minutes} />
                        <span className="ml-1 font-sans text-sm text-mist">min</span>
                      </p>
                    </div>
                  ))}
                </div>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold-500 transition-all duration-700 ease-out-expo group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 max-w-3xl text-sm text-mist">{t.note}</p>
        </Reveal>
      </Container>
    </section>
  );
}
