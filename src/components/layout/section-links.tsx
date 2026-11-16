"use client";


import type { Lang } from "@/content";

import { PageLink } from "../ui/page-link";
import { usePageLinks } from "./use-page-links";

/* I collegamenti alle sezioni del sito nel piè di pagina: restano nella
   pagina dove le sezioni ci sono (home, early bird), altrove portano alla home. */
export function SectionLinks({ lang, links, className }: { lang: Lang; links: readonly { href: string; label: string }[]; className: string }) {
  const { section } = usePageLinks(lang);
  return links.map((l) => (
    <PageLink key={l.href} href={section(l.href)} className={className}>
      {l.label}
    </PageLink>
  ));
}
