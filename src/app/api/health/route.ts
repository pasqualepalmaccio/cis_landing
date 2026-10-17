import { db } from "@/lib/db";

/* Sonda di Coolify: risponde 200 se il processo serve richieste. Lo stato del
   registro dei consensi è riportato ma non cambia il codice di risposta: un
   database giù non deve far riavviare o ritirare il sito (il registro misura,
   non decide). */
export const dynamic = "force-dynamic";

export async function GET() {
  let consentRegistry: "ok" | "down" | "not_configured" = "not_configured";
  if (process.env.DATABASE_URL) {
    try {
      // Tetto di 1,5 s: la sonda di Coolify ha un suo timeout e un database lento non deve farla fallire.
      const probe = db().then((sql) => sql`select 1`);
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("oltre 1,5 s")), 1500));
      await Promise.race([probe, timeout]);
      consentRegistry = "ok";
    } catch (error) {
      console.error(`[health] registro dei consensi non raggiungibile: ${String(error)}`);
      consentRegistry = "down";
    }
  }
  return Response.json({ ok: true, consentRegistry });
}
