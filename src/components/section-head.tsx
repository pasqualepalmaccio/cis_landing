import { Reveal } from "./motion/reveal";
import { SplitWords } from "./motion/split-words";

/** La scala dei titoli di sezione: una sola, qui. */
export const SECTION_TITLE = "font-display text-[clamp(1.9rem,3.8vw,2.9rem)] font-semibold leading-[1.1] text-heading";

type Props = { eyebrow: string; title: string; lead?: string; align?: "left" | "center"; id?: string };

/* I colori vengono dal tono della sezione: Cremisi sul chiaro, Oro chiaro sul blu. */
export function Eyebrow({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-3 font-label text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      {/* Filetto e rombo: ornamento delle intestazioni, nell'oro del marchio. */}
      <span aria-hidden className="flex items-center gap-1.5">
        <span className="h-px w-8 bg-gold-500" />
        <span className="size-1.5 rotate-45 bg-gold-500" />
      </span>
      {children}
    </span>
  );
}

export function SectionHead({ eyebrow, title, lead, align = "left", id }: Props) {
  const center = align === "center";
  return (
    <div className={`mb-10 flex flex-col md:mb-12 ${center ? "items-center text-center" : "items-start"}`}>
      <Reveal y={16}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <h2 id={id} className={`mt-4 max-w-3xl text-balance ${SECTION_TITLE}`}>
        <SplitWords lines={[title]} />
      </h2>
      {lead && (
        <Reveal delay={0.2}>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-muted text-pretty">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
