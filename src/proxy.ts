import { NextResponse, type NextRequest } from "next/server";

/* La radice sceglie la lingua dal browser: inglese a chi non preferisce
   l'italiano, italiano a tutti gli altri. */
export function proxy(request: NextRequest) {
  const accept = request.headers.get("accept-language") ?? "";
  const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  const lang = first === "" || first.startsWith("it") ? "it" : "en";
  return NextResponse.redirect(new URL(`/${lang}`, request.url));
}

export const config = { matcher: "/" };
