"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { NO_PIXEL_PATHS, VENDORS } from "@/lib/consent/config";
import { useConsentState } from "@/lib/consent/store";

type Gtag = (...args: unknown[]) => void;
type Fbq = ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };

declare global {
  interface Window {
    gtag?: Gtag;
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/* Consent Mode v2 in modalità base: il default «denied» è già nell'head
   (ConsentDefaults); qui gtag.js e fbevents.js si caricano solo dopo il
   consenso alla finalità corrispondente. Senza consenso nessuna richiesta
   parte verso Google o Meta. */
export function ConsentTags() {
  const { consent } = useConsentState();
  const pathname = usePathname();
  const configured = useRef(new Set<string>());
  const metaLoaded = useRef(false);

  const statistics = Boolean(consent?.choices.statistics);
  const marketing = Boolean(consent?.choices.marketing);

  useEffect(() => {
    const gtag = window.gtag;
    if (!gtag) return;
    gtag("consent", "update", {
      analytics_storage: statistics ? "granted" : "denied",
      ad_storage: marketing ? "granted" : "denied",
      ad_user_data: marketing ? "granted" : "denied",
      ad_personalization: marketing ? "granted" : "denied",
    });
    const ids = [statistics && VENDORS.ga4, marketing && VENDORS.googleAds].filter(Boolean) as string[];
    const fresh = ids.filter((id) => !configured.current.has(id));
    if (fresh.length === 0) return;
    if (configured.current.size === 0) {
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${fresh[0]}`);
      gtag("js", new Date());
    }
    // GA4 conta da solo i cambi di pagina dell'App Router (eventi della cronologia).
    for (const id of fresh) {
      configured.current.add(id);
      gtag("config", id);
    }
  }, [statistics, marketing]);

  useEffect(() => {
    if (!marketing || !VENDORS.metaPixel || metaLoaded.current) return;
    metaLoaded.current = true;
    const fbq: Fbq = function (...args: unknown[]) {
      if (fbq.callMethod) (fbq.callMethod as (...a: unknown[]) => void).apply(fbq, args);
      else fbq.queue!.push(args);
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = window._fbq = fbq;
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    // Niente advanced matching automatico: il Pixel non legge i campi dei moduli.
    fbq("set", "autoConfig", false, VENDORS.metaPixel);
    fbq("init", VENDORS.metaPixel);
  }, [marketing]);

  useEffect(() => {
    if (!marketing || !window.fbq) return;
    const pagePath = pathname.replace(/^\/(it|en)(?=\/|$)/, "") || "/";
    if (NO_PIXEL_PATHS.includes(pagePath)) return;
    window.fbq("track", "PageView");
  }, [marketing, pathname]);

  return null;
}

/** Va nell'head, prima di qualsiasi tag: tutto negato finché il visitatore non sceglie. */
export const CONSENT_DEFAULTS_SCRIPT = `window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted'});gtag('set','ads_data_redaction',true);`;
