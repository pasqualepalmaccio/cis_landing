"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

import type { Lang } from "@/content";

import { Brand } from "./brand";
import { Container } from "./container";
import { LangSwitch } from "./lang-switch";

/* La barra delle pagine di campagna: lingua a sinistra, stemma al centro,
   nient'altro. Stesse regole della barra completa: trasparente in cima,
   bianca appena si scorre. Lo stemma riporta in cima alla pagina stessa. */
export function FocusedNav({ lang, label, home }: { lang: Lang; label: string; home: string }) {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setSolid(y > 40));
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-fg transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        solid ? "tone-light bg-white/95 shadow-card backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 py-2">
        <div className="flex items-center">
          <LangSwitch lang={lang} label={label} />
        </div>
        <Brand lang={lang} href={home} />
        <div />
      </Container>
    </header>
  );
}
