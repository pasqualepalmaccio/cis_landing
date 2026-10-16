/* Sonda di Coolify: risponde se il processo serve richieste. */
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ ok: true });
}
