import type { OpenDayCopy } from "@/content/open-day";

import { Section } from "../layout/section";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";
import { CARD } from "../ui/card";
import { IconBadge } from "../ui/icon-badge";
import type { IconName } from "../ui/icons";

/* Basi solide, curiosità, ogni bambino, sguardo sul mondo. */
const ICONS: IconName[] = ["shield", "search", "heart", "globe"];

export function Pillars({ t }: { t: OpenDayCopy }) {
  return (
    <Section id="perche" tone="ivory">
      <SectionHead eyebrow={t.pillarsEyebrow} title={t.pillarsTitle} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {t.pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <article className={`h-full border-t-[3px] border-t-gold-500 p-6 shadow-lift ${CARD}`}>
              <IconBadge name={ICONS[i] ?? "shield"} size="sm" />
              <h3 className="mb-2 mt-4 font-display text-xl font-semibold leading-snug text-heading">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-fg-muted">{p.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
