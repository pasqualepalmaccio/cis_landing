import type { Section } from "@/content/legal/it";
import { OWNER_READY } from "@/content/legal/owner";

import { CardList } from "../sections/card-list";

/* Corpo delle pagine legali: una sezione per titolo, paragrafi ed elenchi. */
export function LegalSections({ sections, updated, draftNotice }: { sections: Section[]; updated: string; draftNotice: string }) {
  return (
    <div className="max-w-3xl space-y-12 pb-24">
      <p className="text-sm text-mist">{updated}</p>
      {!OWNER_READY && <p className="rounded-2xl border border-bordeaux bg-bordeaux/25 px-5 py-4 text-sm">{draftNotice}</p>}
      {sections.map((s) => (
        <section key={s.title}>
          <h2 className="font-display text-2xl text-gold-300 sm:text-3xl">{s.title}</h2>
          <div className="mt-4 space-y-4 leading-relaxed text-cream/85">
            {s.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          {s.items && (
            <div className="mt-4 text-cream/85">
              <CardList items={s.items} />
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
