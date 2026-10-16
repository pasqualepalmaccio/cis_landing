import { Container } from "./container";
import { Reveal } from "../motion/reveal";
import { SplitWords } from "../motion/split-words";
import { Eyebrow } from "../section-head";

/* Testata delle pagine interne: occhiello, titolo con parte in corsivo, sottotitolo. */
export function PageHead({ eyebrow, title, titleEm, lead }: { eyebrow: string; title: string; titleEm?: string; lead: string }) {
  return (
    <header className="relative overflow-hidden pb-20 pt-40 sm:pb-28 sm:pt-48">
      <div aria-hidden className="absolute -right-40 -top-40 size-[40rem] rounded-full bg-gold-500/10 blur-[120px]" />
      <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(115deg,color-mix(in_oklab,var(--color-gold-500)_4%,transparent)_0px,color-mix(in_oklab,var(--color-gold-500)_4%,transparent)_1px,transparent_1px,transparent_90px)]" />
      <Container className="relative">
        <Reveal y={12}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <h1 className="mt-6 max-w-5xl font-display text-[clamp(2.4rem,6.4vw,5.6rem)] leading-[1] tracking-tight">
          <SplitWords lines={titleEm ? [title, titleEm] : [title]} immediate delay={0.1} lineClassName="[&:nth-child(3)]:italic [&:nth-child(3)]:text-gold-300" />
        </h1>
        <Reveal delay={0.5}>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist">{lead}</p>
        </Reveal>
      </Container>
    </header>
  );
}
