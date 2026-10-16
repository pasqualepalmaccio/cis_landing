"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import type { Dict, Lang } from "@/content";

import { Brand } from "./brand";
import { Container } from "./container";
import { LangSwitch } from "./lang-switch";

/* Barra che si nasconde scendendo e ricompare risalendo; su mobile apre
   un pannello a tutto schermo. */
export function SiteNav({ lang, t }: { lang: Lang; t: Dict["nav"] }) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === `/${lang}`;
  const home = (hash: string) => (onHome ? hash : `/${lang}${hash}`);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !open);
    setSolid(y > 24);
  });

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid ? "border-line bg-navy-900/75 backdrop-blur-xl" : "border-transparent bg-transparent"
        }`}
      >
        <Container className="flex items-center gap-6 py-3">
          <Brand lang={lang} />
          <nav className="ml-6 hidden items-center gap-7 text-sm text-mist xl:flex">
            {t.links.map((l) => (
              <Link key={l.href} href={home(l.href)} className="group relative py-1 transition-colors hover:text-cream">
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-gold-300 transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2.5">
            <LangSwitch lang={lang} label={t.language} />
            <Link
              href={`/${lang}/registrazione`}
              className="hidden rounded-full bg-gold-500 px-5 py-2.5 text-sm font-bold text-navy-900 transition-colors hover:bg-gold-300 sm:inline-flex"
            >
              {t.cta}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-full border border-line xl:hidden"
              aria-label={t.menu}
              aria-expanded={open}
            >
              <span className="flex w-4 flex-col gap-1">
                <span className="h-px w-full bg-cream" />
                <span className="h-px w-2/3 bg-cream" />
              </span>
            </button>
          </div>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.menu}
            className="fixed inset-0 z-[70] flex flex-col bg-navy-950/95 backdrop-blur-2xl"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2rem)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <Container className="flex items-center justify-between py-3">
              <Brand lang={lang} compact />
              <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-line px-4 py-2 text-sm" aria-label={t.close}>
                {t.close}
              </button>
            </Container>
            <Container className="mt-10 flex flex-1 flex-col gap-2">
              {t.links.map((l, i) => (
                <motion.div key={l.href} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                  <Link href={home(l.href)} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-line py-4 font-display text-4xl">
                    <span className="font-sans text-xs text-gold-500">0{i + 1}</span>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-8">
                <Link href={`/${lang}/registrazione`} onClick={() => setOpen(false)} className="inline-flex rounded-full bg-gold-500 px-7 py-4 font-bold text-navy-900">
                  {t.cta} →
                </Link>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
