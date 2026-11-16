import { z } from "zod";

/* Ciò che il modulo early bird manda al server della landing. Volutamente
   permissivo come il contratto del CRM (crm/src/lib/early-bird.ts): un campo
   accessorio scritto in modo insolito passa e il CRM lo marca «da
   controllare». Si respinge solo ciò senza cui non si può proseguire: un
   recapito, almeno un figlio, i termini accettati e l'informativa letta. */

export const MAX_CHILDREN = 6;
const text = (max: number) => z.string().trim().max(max);

export const earlyBirdForm = z.object({
  /** Generata dal browser quando apre il modulo: un doppio invio non crea due prenotazioni. */
  key: z.uuid(),
  lang: z.enum(["it", "en"]),
  parent: z.object({
    firstName: text(80).min(1),
    lastName: text(80).min(1),
    email: z.email().max(254),
    phone: text(40).default(""),
  }),
  children: z.array(z.object({ firstName: text(80).min(1), lastName: text(80).default(""), birthDate: text(20).default("") })).min(1).max(MAX_CHILDREN),
  busInterest: text(20).default(""),
  futureCity: text(100).default(""),
  message: text(1000).default(""),
  termsAccepted: z.literal(true),
  privacyRead: z.literal(true),
  wantsUpdates: z.boolean().default(false),
  /** Campo esca: marca, non scarta. */
  website: text(200).default(""),
});
export type EarlyBirdForm = z.infer<typeof earlyBirdForm>;

/** Dal FormData del browser all'oggetto da inviare. */
export function earlyBirdFromForm(fd: FormData, lang: "it" | "en", key: string, children: number): unknown {
  const s = (name: string) => String(fd.get(name) ?? "").trim();
  return {
    key,
    lang,
    parent: { firstName: s("firstName"), lastName: s("lastName"), email: s("email"), phone: s("phone") },
    children: Array.from({ length: children }, (_, i) => ({ firstName: s(`child${i}FirstName`), lastName: s(`child${i}LastName`), birthDate: s(`child${i}BirthDate`) })),
    busInterest: s("busInterest"),
    futureCity: s("futureCity"),
    message: s("message"),
    termsAccepted: fd.get("termsAccepted") === "on",
    privacyRead: fd.get("privacyRead") === "on",
    wantsUpdates: fd.get("wantsUpdates") === "on",
    website: s("website"),
  };
}
