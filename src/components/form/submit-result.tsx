import type { RegistrationCopy } from "@/content/registration";

import type { SubmitState } from "./use-submit";

/* L'esito dell'invio, sempre con il contatto alternativo: anche un esito
   positivo può lasciare un dubbio, e il genitore deve sapere a chi scrivere. */
export function SubmitResult({ state, t }: { state: SubmitState; t: RegistrationCopy["result"] }) {
  if (state === "idle" || state === "sending") return null;
  const good = state === "delivered" || state === "queued";
  const [title, body] = {
    delivered: [t.deliveredTitle, t.deliveredBody],
    queued: [t.queuedTitle, t.queuedBody],
    error: [t.errorTitle, t.errorBody],
    invalid: [t.invalidTitle, t.invalidBody],
  }[state];
  return (
    <div role={good ? "status" : "alert"} className={`rounded-2xl border p-5 text-sm ${good ? "border-gold-500 bg-gold-500/10" : "border-bordeaux bg-bordeaux/25"}`}>
      <p className="font-semibold text-gold-300">{title}</p>
      <p className="mt-1 text-cream/90">
        {body} {t.contact}{" "}
        <a href="mailto:info@cis-colico.com" className="font-semibold text-gold-300 underline underline-offset-4">
          info@cis-colico.com
        </a>
        .
      </p>
    </div>
  );
}
