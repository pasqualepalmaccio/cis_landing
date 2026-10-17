import { createHash, timingSafeEqual } from "node:crypto";

/* IP del visitatore troncato (/24 o /48) e cifrato con un sale segreto: serve
   a collegare prove e tentativi a una connessione, non a identificare. Viene
   da Cloudflare (cf-connecting-ip), che sull'origine diretta è falsificabile
   (assunzione L06): si usa solo per marcare, mai per decidere. */
export function ipHash(request: Request): string | null {
  const salt = process.env.CONSENT_IP_SALT;
  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
  if (!salt || !ip) return null;
  const truncated = ip.includes(":") ? ip.split(":").slice(0, 3).join(":") + "::" : ip.split(".").slice(0, 3).join(".") + ".0";
  return createHash("sha256").update(`${salt}|${truncated}`).digest("hex");
}

/** Confronto a tempo costante del segreto dei job (header x-job-secret). */
export function jobAuthorized(request: Request): boolean {
  const expected = process.env.PREREG_JOB_SECRET;
  const given = request.headers.get("x-job-secret");
  if (!expected || !given) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(given);
  return a.length === b.length && timingSafeEqual(a, b);
}
