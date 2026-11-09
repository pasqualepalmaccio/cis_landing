import Link from "next/link";

import type { Dict, Lang } from "@/content";
import { OWNER } from "@/content/legal/owner";
import { SOCIAL } from "@/content/social";
import { TRACKING_ENABLED } from "@/lib/consent/config";

import { Mark } from "../brand/mark";
import { PreferencesButton } from "../consent/preferences-button";
import { Icon } from "../ui/icons";
import { Container } from "./container";

export function SiteFooter({ lang, t, legal, ica }: { lang: Lang; t: Dict["footer"]; legal: Dict["legal"]; ica: string }) {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pt-16">
      <Container className="relative z-10 flex flex-wrap justify-between gap-12 pb-16">
        <div className="space-y-4">
          {/* Stemma con «CIS™» e il nome per esteso (richiesta del 9/11/2026). */}
          <Link href={`/${lang}`} className="flex items-center gap-4" aria-label="CIS Colico International School, home">
            <Mark variant="crest" className="h-20 w-auto sm:h-24" />
            <span className="flex flex-col">
              <span className="font-display text-4xl font-semibold leading-none tracking-[0.06em] text-white sm:text-5xl">
                CIS<sup className="ml-0.5 align-super text-[0.35em] tracking-normal">™</sup>
              </span>
              <span className="mt-2 font-label text-[11px] uppercase tracking-[0.18em] text-gold-300 sm:text-xs">Colico International School</span>
            </span>
          </Link>
          <p className="text-sm text-mist">{t.place}</p>
          {SOCIAL.some((s) => s.href) && (
            <ul className="flex gap-3">
              {SOCIAL.filter((s) => s.href).map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener" aria-label={s.name} className="grid size-10 place-items-center rounded-full border border-white/20 text-mist transition-colors hover:border-gold-300 hover:text-gold-300">
                    <Icon name={s.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-wrap gap-16 text-sm">
          <div className="space-y-3">
            <p className="font-label text-[11px] font-semibold uppercase tracking-[0.08em] text-gold-300">{t.contact}</p>
            <a href="mailto:info@cis-colico.com" className="block text-mist transition-colors hover:text-gold-300">
              info@cis-colico.com
            </a>
          </div>
          <div className="space-y-3">
            <p className="font-label text-[11px] font-semibold uppercase tracking-[0.08em] text-gold-300">{t.project}</p>
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
      {/* Su ogni pagina, perché il nome dei programmi compare su più pagine. */}
      <Container className="relative z-10 pb-6">
        <p className="max-w-[90ch] text-xs text-mist">{ica}</p>
      </Container>
      <Container className="relative z-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/12 py-6 text-xs text-mist">
        <Link href={`/${lang}/privacy`} className="transition-colors hover:text-cta">
          {legal.privacy}
        </Link>
        <Link href={`/${lang}/cookie`} className="transition-colors hover:text-cta">
          {legal.cookie}
        </Link>
        {TRACKING_ENABLED && <PreferencesButton label={legal.preferences} className="transition-colors hover:text-cta" />}
        {/* Ragione sociale, sede e P.IVA sul sito della società (art. 35 DPR 633/1972, art. 2250 c.c.). */}
        {OWNER.name && (
          <span className="sm:ml-auto">
            {OWNER.name} · {OWNER.address} · P.IVA {OWNER.vatNumber}
          </span>
        )}
      </Container>
    </footer>
  );
}
