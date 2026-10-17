import Link from "next/link";

import type { Dict, Lang } from "@/content";

import { Mark } from "../brand/mark";
import { Container } from "./container";

export function SiteFooter({ lang, t }: { lang: Lang; t: Dict["footer"] }) {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-20">
      <Container className="relative z-10 flex flex-wrap justify-between gap-12 pb-16">
        <div className="space-y-4">
          <Link href={`/${lang}`} className="block" aria-label="Colico International School, home">
            <Mark variant="horizontal" className="h-24 w-auto sm:h-28" />
          </Link>
          <p className="text-sm text-mist">{t.place}</p>
        </div>
        <div className="flex flex-wrap gap-16 text-sm">
          <div className="space-y-3">
            <p className="font-semibold text-cream">{t.contact}</p>
            <a href="mailto:info@cis-colico.com" className="block text-mist transition-colors hover:text-gold-300">
              info@cis-colico.com
            </a>
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-cream">{t.project}</p>
            {t.links.map((l) => (
              <Link key={l.href} href={`/${lang}${l.href}`} className="block text-mist transition-colors hover:text-gold-300">
                {l.label}
              </Link>
            ))}
            <Link href={`/${lang}/curricolo`} className="block text-mist transition-colors hover:text-gold-300">
              {t.curriculum}
            </Link>
          </div>
        </div>
      </Container>
      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[18vw] leading-[0.8] text-transparent italic [-webkit-text-stroke:1px_color-mix(in_oklab,var(--color-gold-500)_18%,transparent)]"
      >
        {t.motto}
      </p>
    </footer>
  );
}
