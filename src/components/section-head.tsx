import { Reveal } from "./motion/reveal";
import { SplitWords } from "./motion/split-words";

type Props = { eyebrow: string; title: string; lead?: string; align?: "left" | "center"; id?: string };

export function Eyebrow({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-3 font-label text-xs font-semibold uppercase tracking-[0.22em] text-gold-300">
      {/* Filetto e rombo: lo stesso ornamento che separa le righe del marchio orizzontale. */}
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
    <div className={`mb-14 max-w-3xl sm:mb-20 ${center ? "mx-auto text-center" : ""}`}>
      <Reveal y={16}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <h2 id={id} className="mt-6 font-display text-[clamp(2.1rem,5vw,4rem)] leading-[1.02] tracking-tight text-balance">
        <SplitWords lines={[title]} />
      </h2>
      {lead && (
        <Reveal delay={0.2}>
          <p className={`mt-6 text-lg leading-relaxed text-mist ${center ? "mx-auto" : ""} max-w-2xl text-pretty`}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
