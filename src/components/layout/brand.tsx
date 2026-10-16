import Image from "next/image";
import Link from "next/link";

import type { Lang } from "@/content";

export function Brand({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  return (
    <Link href={`/${lang}`} className="group flex items-center gap-3" aria-label="Colico International School — home">
      <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-cream p-0.5 shadow-[0_0_0_1px_rgb(232_196_106/0.35)] transition-transform duration-500 ease-out-expo group-hover:rotate-[-4deg] group-hover:scale-105 sm:size-13">
        <Image src="/images/stemma-cis.png" alt="" width={333} height={500} className="h-full w-auto object-contain" priority />
      </span>
      <span className="font-display leading-[1.1]">
        <span className="block text-xl font-bold tracking-wide sm:text-2xl">
          CIS<sup className="ml-0.5 text-[0.5em] font-normal">™</sup>
        </span>
        {!compact && <span className="hidden text-[13px] italic text-gold-300 sm:block">Colico International School</span>}
      </span>
    </Link>
  );
}
