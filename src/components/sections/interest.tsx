import Image from "next/image";
import Link from "next/link";

import type { Dict, Lang } from "@/content";

import { Container } from "../layout/container";
import { Magnetic } from "../motion/magnetic";
import { Reveal } from "../motion/reveal";
import { SectionHead } from "../section-head";

export function Interest({ lang, t }: { lang: Lang; t: Dict["interest"] }) {
  return (
    <section id="interesse" className="relative isolate overflow-hidden py-32 sm:py-48">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgb(212_160_44/0.22),transparent_60%)]" />
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 w-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]">
        <Image src="/images/stemma-cis.png" alt="" width={333} height={500} className="w-full" />
      </div>
      <Container>
        <SectionHead eyebrow={t.eyebrow} title={t.title} lead={t.lead} align="center" />
        <Reveal className="text-center">
          <Magnetic strength={0.4}>
            <Link
              href={`/${lang}/registrazione`}
              className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-gold-500 py-3 pl-9 pr-3 text-lg font-bold text-navy-900"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-1000 ease-out-expo group-hover:translate-x-full" />
              <span className="relative">{t.cta}</span>
              <span className="relative grid size-12 place-items-center rounded-full bg-navy-900 text-gold-300 transition-transform duration-500 ease-out-expo group-hover:-rotate-45">
                →
              </span>
            </Link>
          </Magnetic>
          <p className="mt-6 text-sm text-mist">{t.note}</p>
        </Reveal>
      </Container>
    </section>
  );
}
