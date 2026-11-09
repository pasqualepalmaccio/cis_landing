import { TRACKING_ENABLED, DECLARED } from "@/lib/consent/config";

import { SUBMISSION_ENABLED } from "../registration";
import type { LegalDict, Section } from "./it";
import { OWNER, POLICY_UPDATED } from "./owner";

/* English privacy and cookie policy: same structure as the Italian one, which
   is the reference text, and the same rule: Google, Meta, banner and consent
   log appear only when the provider is configured. */

const missing = "[to be completed]";
const o = (v: string) => v || missing;
const GOOGLE = TRACKING_ENABLED && Boolean(DECLARED.ga4 || DECLARED.googleAds);
const META = TRACKING_ENABLED && Boolean(DECLARED.metaPixel);
const when = <T>(on: boolean, ...items: T[]): T[] => (on ? items : []);

export const legalEn: LegalDict = {
  updated: `Last updated: ${POLICY_UPDATED}`,
  draftNotice: "Draft under review. Some details about the data controller are still missing.",
  privacy: {
    meta: { title: "Privacy policy · CIS", description: "How the Colico International School website handles visitors' personal data." },
    eyebrow: "Privacy",
    title: "Privacy policy",
    lead: "This page explains what data the site collects, why, who we share it with and how you can exercise your rights.",
    sections: [
      {
        title: "Who the controller is",
        paragraphs: [
          `The data controller is ${o(OWNER.name)}, registered office ${o(OWNER.address)}, VAT number ${o(OWNER.vatNumber)}.`,
          `For any privacy question, write to ${o(OWNER.privacyEmail)}.${OWNER.dpoEmail ? ` Our data protection officer (DPO) can be reached at ${OWNER.dpoEmail}.` : ""}`,
        ],
      },
      {
        title: "What data we process",
        paragraphs: [
          "When you visit the site, the server receives the technical data every browser sends: IP address, browser type, requested page, date and time. We need it to show you the pages and to keep the site secure.",
          TRACKING_ENABLED
            ? "If you agree, we also use statistics and marketing cookies. What they do, who runs them and how long they last is in the cookie policy."
            : "The site uses no statistics or advertising cookies, and your browser does not contact Google or Meta.",
          "If you email us, we use what you send to reply.",
          "If you register for Meet & Discover CIS, we process the data described in the dedicated section below.",
          SUBMISSION_ENABLED
            ? "If you fill in the pre-registration form, we process the data described in the dedicated section below."
            : "The pre-registration form is not active yet. We will update this page before switching it on.",
        ],
      },
      {
        title: "Registering for Meet & Discover CIS",
        paragraphs: [
          "If you register, we process: first and last name, email and phone; how many adults and children are coming to the meeting; for each child you are considering the school for, even if they are not coming, year of birth, school level of interest and the school year they would start, and their name only if you choose to give it; how you heard about us, if you tell us; whether we may also contact you by phone or WhatsApp. We also keep the parameters of the link you arrived from (utm), which show which ad or email brought you to the page. They are read from the address, without cookies.",
          "The information about children is entered by the parent and may include children who are not coming to the meeting. We only ask for what we need to organise the meeting and to understand which class and which year you are interested in.",
          "First and last name, email, phone, number of people and, for each child you list, year of birth, school level and starting year are required: without them we cannot register you. The child's name and \"how did you hear about us\" are optional.",
          "We use this data to handle the registration you ask for: assigning your time, sending the confirmation, the reminder and any notices about the event, managing the waiting list and answering your questions about joining the school (Art. 6(1)(b) GDPR, pre-contractual steps at your request). The link parameters tell us, in aggregate, which channels work (legitimate interest, Art. 6(1)(f) GDPR). To protect the form from automated submissions we use an encrypted fingerprint of your IP address, never the address in clear (legitimate interest, Art. 6(1)(f) GDPR).",
          "The \"I have read the privacy notice\" box is not consent: it only confirms you have read this page. Without your consent we send no promotional messages. Updates about the school only go to people who tick the optional box and then confirm their address from the link they receive (Art. 6(1)(a) GDPR). In that case we keep proof of the consent: date and time, page, browser and the encrypted fingerprint of your IP address. You can unsubscribe from updates at any time from the link in each of those emails. Emails about the event (confirmation, reminder, notices) carry a link to cancel your registration instead.",
          "The information about children, the answer to \"how did you hear about us\" and the link parameters are deleted 12 months after the meeting. Only the link to the campaign you arrived from remains, for statistics. First and last name, email and phone stay in our management system as long as we need them to follow up on your interest in the school, and you can ask us to delete them at any time. The website server keeps a technical safety copy of the registration, emptied 30 days after the management system has recorded it. If the registration does not go through, the copy stays until we have sorted the problem out with you.",
          "In the management system only people authorised by the school can see it.",
        ],
      },
      ...(SUBMISSION_ENABLED
        ? [
            {
              title: "The pre-registration form",
              paragraphs: [
                "If you fill in the form, we process your contact details (first and last name, email, phone, town) and the information you give us about your children: age, year of entry, town where you will live, country of their current school, languages used, interest in the bus. We do not ask for the children's names.",
                "We use them to contact you, at your request, before enrolment and to plan the school's opening in aggregate form (Art. 6(1)(b) GDPR). The form is not an enrolment and does not assign a place.",
                "Please do not include any health information about your children. If it reaches us anyway, we delete it.",
                "We only send email updates if you ask for them and confirm your address from the link you receive (Art. 6(1)(a) GDPR). You can unsubscribe from every email.",
                "The data stays in our management system for 24 months and is then deleted. The website server keeps a technical safety copy, deleted 30 days after the management system has confirmed it recorded the data.",
                "In the management system only the school office and management can see it.",
              ],
            },
          ]
        : []),
      {
        title: "Why, and on what legal basis",
        paragraphs: [],
        items: [
          "Running the site and keeping it secure: needed to provide the page you ask for, and in our legitimate interest in security (Art. 6(1)(b) and 6(1)(f) GDPR).",
          ...when(TRACKING_ENABLED, "Remembering your cookie choice and keeping proof of it: a legal obligation (Art. 6(1)(c) and Art. 7(1) GDPR)."),
          "Handling your Meet & Discover CIS registration: needed to follow up on your request (Art. 6(1)(b) GDPR).",
          ...when(Boolean(TRACKING_ENABLED && DECLARED.ga4), "Visit statistics: only with your consent (Art. 6(1)(a) GDPR)."),
          ...when(Boolean(TRACKING_ENABLED && (DECLARED.googleAds || DECLARED.metaPixel)), "Measuring our ads and showing them to people who have visited the site (remarketing): only with your consent (Art. 6(1)(a) GDPR)."),
          "Sending you updates about the school: only if you ask for them and confirm your address (Art. 6(1)(a) GDPR).",
          "Replying to your emails: needed to follow up on your request (Art. 6(1)(b) GDPR).",
        ],
      },
      ...when(TRACKING_ENABLED, {
        title: "Proof of your consent",
        paragraphs: [
          "When you make a choice in the banner we keep a record of it: a random code, date and time, the banner version, the purposes accepted or refused, your browser and an encrypted fingerprint of your IP address, which is shortened before it is encrypted. It does not contain your name or your IP address in clear.",
          `We keep this record for ${o(OWNER.consentRetention.en)} after your last choice, so that we can prove consent if asked.`,
        ],
      }),
      {
        title: "Who we share data with",
        paragraphs: ["We do not sell or hand over your data to anyone. It only reaches the providers we need to run the site and send emails, who process it on our behalf:"],
        items: [
          "Hetzner Online GmbH (Germany), which hosts the servers of the site and of the management system, as processor.",
          "Cloudflare, Inc., which protects and speeds up the site, as processor.",
          "Resend, Inc. (United States), which sends confirmation, reminder and update emails, as processor.",
          ...when(GOOGLE, "Google Ireland Ltd and Google LLC, for Google Analytics and Google Ads, only if you accept them in the cookie banner."),
          ...when(META, "Meta Platforms Ireland Ltd, for the Meta Pixel, only if you accept it in the cookie banner. For collecting and transmitting Pixel data we are joint controllers with Meta (Art. 26 GDPR). The essence of the arrangement is at facebook.com/legal/controller_addendum. Meta is the sole controller for whatever it does with the data afterwards."),
        ],
      },
      {
        title: "Transfers outside the European Union",
        paragraphs: [
          `${[...when(GOOGLE, "Google"), ...when(META, "Meta"), "Cloudflare", "Resend"].join(", ").replace(/, (?=[^,]+$)/, " and ")} may process data in the United States. The transfer relies on the European Commission's adequacy decision of 10 July 2023 (EU-US Data Privacy Framework), for the companies that have joined it, and on standard contractual clauses.`,
        ],
      },
      {
        title: "How long",
        paragraphs: [
          "Technical browsing data stays in the server logs only as long as needed for security.",
          "For Meet & Discover CIS registrations and pre-registration, the periods are in the dedicated sections.",
          TRACKING_ENABLED
            ? "Each cookie's lifetime is listed in the cookie policy. Emails are kept as long as we need them to handle your request."
            : "Emails are kept as long as we need them to handle your request.",
        ],
      },
      {
        title: "Children",
        paragraphs: [
          `The site is meant for parents. We do not collect data directly from children under 14: information about children is entered by the parent, when registering for the meeting or pre-registering.${TRACKING_ENABLED ? " Our advertising is not aimed at children." : ""}`,
        ],
      },
      {
        title: "Your rights",
        paragraphs: [
          `You can ask to access your data, correct it, delete it, restrict its use, receive it in a portable format and object to its processing (Art. 15-22 GDPR). You can withdraw a consent at any time${TRACKING_ENABLED ? ': cookie consent from "Cookie preferences" at the bottom of every page, consent to updates from the link in every update email' : ", from the link in every update email"}. Withdrawal does not affect what happened before. To exercise your rights, write to ${o(OWNER.privacyEmail)}.`,
          "If you believe the processing breaks the law, you can complain to the Italian data protection authority (garanteprivacy.it) or to the authority where you live.",
        ],
      },
      {
        title: "Changes",
        paragraphs: ["If we change this policy we update the date at the top. If the purposes or providers change, we ask for your consent again."],
      },
    ] as Section[],
  },
  cookie: {
    meta: { title: "Cookie policy · CIS", description: "Which cookies the Colico International School website uses and how to manage them." },
    eyebrow: "Cookies",
    title: "Cookie policy",
    lead: "Cookies are small files the site stores in your browser. Some are needed for the site to work; others we only use with your permission.",
    sections: [
      ...(TRACKING_ENABLED
        ? [
            {
              title: "How consent works",
              paragraphs: [
                "On your first visit a banner asks what you accept. Until you choose, the site only uses technical cookies and your browser does not contact Google or Meta. Closing the banner with the X counts as refusing.",
                "We ask again after 6 months, or sooner if purposes or providers change. You can change your mind at any time from \"Cookie preferences\" at the bottom of every page.",
              ],
            },
            { title: "Technical", paragraphs: ["Needed for the site to work and to remember your cookie choice. They do not require consent."] },
          ]
        : [
            {
              title: "The site uses no cookies today",
              paragraphs: [
                "The site stores no cookies in your browser: no statistics, no advertising, and your browser does not contact Google or Meta. That is why you see no banner: there is nothing to accept.",
                "If we start using statistics or advertising tools, we will update this page and a banner will ask for your consent on your first visit. Nothing will run without your yes.",
              ],
            },
          ]),
      ...when(Boolean(TRACKING_ENABLED && DECLARED.ga4), {
        title: "Statistics",
        paragraphs: ["With your consent we use Google Analytics to count visits and page views. We use Google Consent Mode: without consent the script is not loaded."],
      }),
      ...when(Boolean(TRACKING_ENABLED && (DECLARED.googleAds || DECLARED.metaPixel)), {
        title: "Marketing and remarketing",
        paragraphs: [
          `With your consent we use ${[...when(Boolean(DECLARED.googleAds), "Google Ads"), ...when(META, "the Meta Pixel")].join(" and ")} to know whether a visit came from one of our ads and to show our ads to people who have visited the site.${META ? " The Meta Pixel does not read form fields and sends no events from the pre-registration and Meet & Discover CIS registration pages." : ""}`,
        ],
      }),
      ...when(TRACKING_ENABLED, {
        title: "Managing cookies in your browser",
        paragraphs: ["You can also delete or block cookies in your browser settings. If you block technical cookies, the site may ask for your choice on every visit."],
      }),
      ...when(GOOGLE || META, {
        title: "Providers' policies",
        paragraphs: [],
        items: [
          ...when(GOOGLE, "Google: policies.google.com/privacy and business.safety.google/adscookies"),
          ...when(META, "Meta: facebook.com/privacy/policy and facebook.com/policies/cookies"),
        ],
      }),
    ] as Section[],
    table: {
      title: "Cookies on this site",
      head: { name: "Name", provider: "Provider", purpose: "Purpose", duration: "Duration" },
      purposes: { necessary: "Technical", statistics: "Statistics", marketing: "Marketing" },
      days: (d: number) => (d === 0 ? "session" : d >= 365 ? `${Math.round(d / 365)} ${Math.round(d / 365) === 1 ? "year" : "years"}` : d >= 60 ? `${Math.round(d / 30)} months` : `${d} days`),
      thirdParty: "third-party",
    },
  },
};
