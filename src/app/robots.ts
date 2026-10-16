import type { MetadataRoute } from "next";
import { headers } from "next/headers";

import { NOINDEX_HOST } from "@/lib/seo";

/* Sull'anteprima (landing.cis-colico.com) nessun crawler; altrove tutto aperto. */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host")?.split(":")[0];
  return { rules: { userAgent: "*", ...(host === NOINDEX_HOST ? { disallow: "/" } : { allow: "/" }) } };
}
