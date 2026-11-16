import type { ReactNode } from "react";

import type { Dict, Lang } from "@/content";

import { Access } from "./access";
import { Campus } from "./campus";
import { Curriculum } from "./curriculum";
import { Fees } from "./fees";
import { Interest } from "./interest";
import { Philosophy } from "./philosophy";
import { Safety } from "./safety";
import { Timeline } from "./timeline";
import { Vision } from "./vision";

/* Il corpo del sito dopo l'apertura, in un posto solo: lo usano la home e
   la pagina early bird, che cambia solo l'apertura e aggiunge i richiami.
   Fondi alternati (bianco, avorio, blu) nell'ordine del prototipo.
   `beforeFees`: ciò che va subito prima delle rette (il banner early bird). */
export function HomeBody({ lang, t, beforeFees }: { lang: Lang; t: Dict; beforeFees?: ReactNode }) {
  return (
    <>
      <Vision t={t.vision} />
      <Curriculum lang={lang} t={t.curriculum} ica={t.ica} />
      <Access t={t.access} />
      <Campus t={t.campus} />
      <Philosophy lang={lang} t={t.philosophy} />
      <Safety t={t.safety} />
      {beforeFees}
      <Fees lang={lang} t={t.fees} />
      <Timeline t={t.timeline} />
      <Interest lang={lang} t={t.interest} />
    </>
  );
}
