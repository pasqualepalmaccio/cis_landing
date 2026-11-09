"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import type { Dict } from "@/content";

import { Section } from "../layout/section";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";

export function Campus({ t }: { t: Dict["campus"] }) {
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  /* La fotografia si apre mentre entra nella vista e scorre al suo interno. */
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 20]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i}% ${i}% ${i}% ${i}% round ${r}px)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);

  return (
    <Section id="campus" tone="navy" className="overflow-hidden">
      <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      <div ref={frame}>
        <motion.figure style={reduce ? undefined : { clipPath }} className="relative aspect-[16/9] overflow-hidden rounded-[20px] sm:aspect-[31/12]">
          <motion.div className="absolute inset-0" style={reduce ? undefined : { scale }}>
            <Image src="/images/sede-ingresso-stemma.jpg" alt={t.hero.alt} fill sizes="(min-width: 1240px) 1176px, 100vw" className="object-cover object-left" />
          </motion.div>
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/85 to-transparent px-6 pb-5 pt-16 text-sm font-semibold text-gold-300 sm:px-10">
            {t.hero.caption}
          </figcaption>
        </motion.figure>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {t.gallery.map((g, i) => (
          <Reveal key={g.src} as="figure" delay={i * 0.12} className="group overflow-hidden rounded-xl border border-rule bg-navy-950">
            <div className="relative aspect-[384/354] overflow-hidden">
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110"
              />
            </div>
            <figcaption className="px-5 py-4 text-sm font-semibold text-gold-300">{g.caption}</figcaption>
          </Reveal>
        ))}
      </div>
      <p className="mt-4 text-[13px] italic text-fg-muted">{t.note}</p>
    </Section>
  );
}
