import type { Lang } from "@/content";
import type { PublicEvent } from "@/lib/open-day/event";

import { absoluteUrl, SITE_NAME } from "./metadata";

/* Fatti della scuola in forma leggibile dalle macchine (motori di ricerca e
   generativi). Solo quello che il sito afferma già: niente programmi,
   accreditamenti o date di fondazione che la scuola non ha ancora. */
const ORGANIZATION = {
  "@type": "EducationalOrganization",
  name: SITE_NAME,
  alternateName: "CIS",
  email: "info@cis-colico.com",
  address: { "@type": "PostalAddress", addressLocality: "Colico", addressRegion: "LC", addressCountry: "IT" },
} as const;

export function schoolJsonLd(lang: Lang, description: string) {
  return {
    "@context": "https://schema.org",
    ...ORGANIZATION,
    url: absoluteUrl(`/${lang}`),
    logo: absoluteUrl("/apple-touch-icon.png"),
    description,
    areaServed: lang === "it" ? "Alto Lago di Como" : "North shore of Lake Como",
  };
}

/* Un Event per sessione, con orari e luogo così come li pubblica il CRM:
   nessuna ora scritta qui, che potrebbe divergere da quella vera. */
export function openDayJsonLd(lang: Lang, event: PublicEvent, description: string) {
  return event.sessions.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${event.title[lang]} · ${SITE_NAME}`,
    description,
    startDate: s.startsAt,
    endDate: s.endsAt,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: lang,
    url: absoluteUrl(`/${lang}/meet-and-discover`),
    location: { "@type": "Place", name: event.place, address: event.place },
    organizer: { ...ORGANIZATION, url: absoluteUrl(`/${lang}`) },
  }));
}
