import type { ReactNode } from "react";

import { Container } from "./container";

/* Una sezione della landing: fondo, tono del testo e spaziatura verticale.
   La spaziatura è una sola per tutte (96px su schermo largo, 48px su mobile):
   è il motivo per cui fra due sezioni non si aprono più «buchi» diversi. */
const TONE = {
  white: "tone-light bg-white",
  ivory: "tone-light bg-cream",
  navy: "tone-navy bg-navy-900",
} as const;

export type Tone = keyof typeof TONE;

type Props = { id?: string; tone: Tone; children: ReactNode; className?: string; labelledBy?: string };

export function Section({ id, tone, children, className = "", labelledBy }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-12 md:py-24 ${TONE[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
