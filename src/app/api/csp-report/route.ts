import { db, recheckSchema } from "@/lib/db";

/* Le violazioni CSP finiscono qui. Senza questo endpoint un tag bloccato in
   produzione resterebbe solo nella console del visitatore: conversioni a zero
   e nessun errore lato server. */

export const dynamic = "force-dynamic";

type Report = Record<string, unknown>;

function pick(r: Report) {
  // Formato legacy (report-uri) e formato Reporting API (report-to).
  const body = (r["csp-report"] ?? r.body ?? r) as Report;
  const text = (k: string) => (typeof body[k] === "string" ? (body[k] as string).slice(0, 500) : null);
  return {
    document: text("document-uri") ?? text("documentURL"),
    blocked: text("blocked-uri") ?? text("blockedURL"),
    directive: text("violated-directive") ?? text("effectiveDirective") ?? text("effective-directive"),
    raw: body,
  };
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 20_000) return new Response(null, { status: 413 });
  let reports: Report[];
  try {
    const parsed = JSON.parse(raw) as Report | Report[];
    reports = Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return new Response(null, { status: 400 });
  }
  const rows = reports.slice(0, 20).map(pick);
  for (const r of rows) console.warn(`[csp] bloccato ${r.blocked ?? "?"} (${r.directive ?? "?"}) su ${r.document ?? "?"}`);
  try {
    const sql = await db();
    for (const r of rows) {
      await sql`insert into csp_reports (document_uri, blocked_uri, directive, raw) values (${r.document}, ${r.blocked}, ${r.directive}, ${sql.json(r.raw as never)})`;
    }
  } catch (error) {
    recheckSchema();
    // Il resoconto è già nei log qui sopra: il database è un secondo archivio.
    console.error(`[csp] resoconto non salvato nel database: ${String(error)}`);
  }
  return new Response(null, { status: 204 });
}
