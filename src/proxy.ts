import { NextResponse, type NextRequest } from "next/server";

/* La radice sceglie la lingua dal browser: inglese a chi non preferisce
   l'italiano, italiano a tutti gli altri. */
export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept-language") ?? "";
  const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  const lang = first === "" || first.startsWith("it") ? "it" : "en";
  // La query string resta: gclid, fbclid e utm_* servono ad attribuire le visite dagli annunci.
  const target = request.nextUrl.clone();
  target.pathname = `/${lang}`;
  return NextResponse.redirect(target);
}

export const config = { matcher: "/" };
