import Image from "next/image";

import type { Dict } from "@/content";

import { Rich } from "../rich";

/* La clausola sul curricolo internazionale con i loghi IEYC e IPC. Le parole
   vengono da un solo posto (Dict["ica"]); la usano la home e la pagina del curricolo. */
export function IcaStrip({ t }: { t: Dict["ica"] }) {
  return (
    <div className="tone-light flex flex-wrap items-center gap-8 rounded-xl border border-gold-500 bg-white p-6 sm:p-8">
      <div className="flex shrink-0 items-center gap-4">
        <a href={t.href} target="_blank" rel="noopener" className="block">
          <Image src="/images/ica/ieyc.png" alt={t.alts.ieyc} width={125} height={60} className="h-14 w-auto" />
        </a>
        <a href={t.href} target="_blank" rel="noopener" className="block">
          <Image src="/images/ica/ipc.png" alt={t.alts.ipc} width={125} height={60} className="h-14 w-auto" />
        </a>
      </div>
      <div className="min-w-64 flex-1">
        <p className="leading-relaxed text-fg-muted">
          <Rich text={t.full} />
        </p>
        <a href={t.href} target="_blank" rel="noopener" className="group mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-bordeaux">
          {t.link}
          <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </div>
  );
}
