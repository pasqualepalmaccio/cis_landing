import { createHash } from "node:crypto";

import { z } from "zod";

import { en } from "@/content/en";
import { it } from "@/content/it";
import { legalEn } from "@/content/legal/en";
import { legalIt } from "@/content/legal/it";
import { COOKIES } from "@/content/legal/cookies";
import { CONSENT_VERSION } from "@/lib/consent/config";
import { db, DatabaseUnavailable, recheckSchema } from "@/lib/db";

/* Registro dei consensi (record 2026-10-17). Ogni scelta è una riga nuova; la
   riga cita l'hash dei testi in vigore (banner, privacy, cookie policy,
   inventario), archiviati una volta per hash in policy_versions. */

export const dynamic = "force-dynamic";

const Body = z.object({
  id: z.uuid(),
  version: z.string().max(40),
  choices: z.object({ statistics: z.boolean(), marketing: z.boolean() }),
  action: z.enum(["accept_all", "reject_all", "custom", "close"]),
  at: z.number().int().positive(),
  lang: z.string().max(5).optional(),
  path: z.string().max(200).optional(),
});

/* I testi mostrati al visitatore. Le funzioni (durate formattate) non entrano
   nel JSON: le durate sono comunque nell'inventario COOKIES. */
const POLICY_CONTENT = JSON.parse(
  JSON.stringify({
    version: CONSENT_VERSION,
    banner: { it: it.consent, en: en.consent },
    legal: { it: legalIt, en: legalEn },
    cookies: COOKIES,
  }),
) as unknown;
const POLICY_HASH = createHash("sha256").update(JSON.stringify(POLICY_CONTENT)).digest("hex");

let policyStored = false;

/* IP troncato (/24 o /48) e poi cifrato con un sale segreto: serve solo a
   collegare una prova a una connessione, non a identificare. */
function ipHash(request: Request): string | null {
  const salt = process.env.CONSENT_IP_SALT;
  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  if (!salt || !ip) return null;
  const truncated = ip.includes(":") ? ip.split(":").slice(0, 3).join(":") + "::" : ip.split(".").slice(0, 3).join(".") + ".0";
  return createHash("sha256").update(`${salt}|${truncated}`).digest("hex");
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 2000) return Response.json({ error: "payload troppo grande" }, { status: 413 });
  let parsed;
  try {
    parsed = Body.safeParse(JSON.parse(raw));
  } catch {
    return Response.json({ error: "JSON non valido" }, { status: 400 });
  }
  if (!parsed.success) return Response.json({ error: "campi non validi" }, { status: 422 });
  const b = parsed.data;

  try {
    const sql = await db();
    if (!policyStored) {
      await sql`insert into policy_versions (hash, version, content) values (${POLICY_HASH}, ${CONSENT_VERSION}, ${sql.json(POLICY_CONTENT as never)}) on conflict (hash) do nothing`;
      policyStored = true;
    }
    await sql`
      insert into consent_records (consent_id, client_at, version, statistics, marketing, action, lang, path, ip_hash, user_agent, policy_hash)
      values (${b.id}, ${new Date(b.at)}, ${b.version}, ${b.choices.statistics}, ${b.choices.marketing}, ${b.action},
              ${b.lang ?? null}, ${b.path ?? null}, ${ipHash(request)}, ${request.headers.get("user-agent")?.slice(0, 400) ?? null}, ${POLICY_HASH})`;
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    // Il visitatore tiene la sua scelta e ritenta; qui il guasto deve lasciare traccia nei log.
    recheckSchema();
    policyStored = false;
    const reason = error instanceof DatabaseUnavailable ? error.message : String(error);
    console.error(`[consenso] registro non scritto: ${reason}`);
    return Response.json({ error: "registro non disponibile" }, { status: 503 });
  }
}
