"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import type { Dict, Lang } from "@/content";

import { Container } from "../layout/container";
import { Magnetic } from "../motion/magnetic";
import { SplitWords } from "../motion/split-words";
import { Rich } from "../rich";
import { ButtonLink } from "../ui/button-link";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero({ lang, t, ica }: { lang: Lang; t: Dict["hero"]; ica: Dict["ica"] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.32]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="tone-navy relative isolate flex min-h-[94svh] items-end overflow-hidden bg-navy-950 pb-14 pt-32 sm:min-h-[100svh] sm:pb-20">
      {/* Fotografia: entra da un'apertura che si allarga, poi scorre più lenta della pagina. */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={reduce ? false : { clipPath: "inset(18% 22% 18% 22% round 2rem)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 0rem)" }}
        transition={{ duration: 1.6, ease, delay: 0.15 }}
      >
        <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: imageScale, y: imageY }}>
          <Image
            src="/images/hero-lago.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_70%]"
          />
        </motion.div>
      </motion.div>

      {/* Velature: blu notte dall'alto e dal basso, luce dorata che respira. */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/80 via-navy-950/25 to-navy-950/85" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/60 via-transparent to-transparent" />
      <motion.div
        aria-hidden
        className="absolute -left-1/4 -top-1/3 -z-10 size-[80vw] rounded-full bg-gold-500/20 blur-[120px]"
        animate={reduce ? undefined : { opacity: [0.35, 0.7, 0.35], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div aria-hidden className="grain absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay" />

      <Container>
        <motion.div style={reduce ? undefined : { y: textY, opacity: fade }}>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/30 bg-navy-950/50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md sm:text-xs"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-gold-300 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-gold-500" />
            </span>
            <span>{t.eyebrow}</span>
          </motion.p>

          <h1 className="mt-7 font-display text-[clamp(2.3rem,5.2vw,4.6rem)] font-semibold leading-[1.05] tracking-[-0.015em] text-white [text-shadow:0_2px_30px_color-mix(in_oklab,var(--color-navy-950)_60%,transparent)]">
            <SplitWords lines={t.titleLines} immediate delay={0.7} lineClassName="[&:nth-child(3)]:italic [&:nth-child(3)]:text-gold-300" />
          </h1>

          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5, ease }}
                className="max-w-md font-display text-xl italic text-white/85 sm:text-2xl"
              >
                {/* Il motto: claim di marchio, sotto il titolo e più piccolo. */}
                {t.sub}
              </motion.p>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.7, ease }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Magnetic>
                  <ButtonLink href={`/${lang}/registrazione`} arrow>
                    {t.cta}
                  </ButtonLink>
                </Magnetic>
                <ButtonLink href="#visione" variant="ghost">
                  {t.explore}
                </ButtonLink>
              </motion.div>
              {/* Il curricolo internazionale, con la clausola: l'accordo con l'ICA non è ancora firmato. */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.9, ease }}
                className="mt-7 flex max-w-xl items-center gap-4"
              >
                <a href="#curricolo" className="shrink-0 rounded-lg bg-cream px-3 py-2">
                  <Image src="/images/ica/ica-ieyc-ipc.svg" alt={ica.alts.badge} width={175} height={70} className="h-11 w-auto" />
                </a>
                <p className="text-xs leading-snug text-white/85 [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                  <Rich text={ica.short} />
                </p>
              </motion.div>
            </div>

            <motion.dl
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 1.9 } } }}
              className="flex gap-8 border-t border-white/20 pt-6 sm:gap-12 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
            >
              {t.facts.map((f) => (
                <motion.div
                  key={f.label}
                  variants={{ hidden: reduce ? {} : { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } }}
                >
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display text-3xl font-semibold text-gold-300 sm:text-4xl">{f.value}</dd>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/70">{f.label}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </motion.div>
      </Container>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-label text-[10px] uppercase tracking-[0.3em] text-white/65 md:flex"
      >
        {t.scroll}
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold-300"
            animate={reduce ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
