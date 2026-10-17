import type { LegalDict, Section } from "./it";
import { SUBMISSION_ENABLED } from "../registration";

import { OWNER, POLICY_UPDATED } from "./owner";

/* English privacy and cookie policy: same structure as the Italian one, which
   is the reference text. */

const missing = "[to be completed]";
const o = (v: string) => v || missing;

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
          "If you agree, we also use statistics and marketing cookies. What they do, who runs them and how long they last is in the cookie policy.",
          "If you email us, we use what you send to reply.",
          SUBMISSION_ENABLED
            ? "If you fill in the pre-registration form, we process the data described in the dedicated section below."
            : "The pre-registration form is not active yet: today the site does not collect data through forms. We will update this page before switching it on.",
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
          "Remembering your cookie choice and keeping proof of it: a legal obligation (Art. 6(1)(c) and Art. 7(1) GDPR).",
          "Visit statistics: only with your consent (Art. 6(1)(a) GDPR).",
          "Measuring our ads and showing them to people who have visited the site (remarketing): only with your consent (Art. 6(1)(a) GDPR).",
          "Replying to your emails: needed to follow up on your request (Art. 6(1)(b) GDPR).",
        ],
      },
      {
        title: "Proof of your consent",
        paragraphs: [
          "When you make a choice in the banner we keep a record of it: a random code, date and time, the banner version, the purposes accepted or refused, your browser and an encrypted fingerprint of your IP address, which is shortened before it is encrypted. It does not contain your name or your IP address in clear.",
          `We keep this record for ${o(OWNER.consentRetention.en)} after your last choice, so that we can prove consent if asked.`,
        ],
      },
      {
        title: "Who we share data with",
        paragraphs: ["Data only goes to those we need to run the site or for the purposes you accepted:"],
        items: [
          "Hetzner Online GmbH (Germany), which hosts the site's server, as processor.",
          "Cloudflare, Inc., which protects and speeds up the site, as processor.",
          ...(SUBMISSION_ENABLED ? ["Resend, Inc. (United States), which sends the confirmation email for updates, as processor."] : []),
          "Google Ireland Ltd and Google LLC, for Google Analytics and Google Ads, only with your consent.",
          "Meta Platforms Ireland Ltd, for the Meta Pixel, only with your consent. For collecting and transmitting Pixel data we are joint controllers with Meta (Art. 26 GDPR). The essence of the arrangement is at facebook.com/legal/controller_addendum. Meta is the sole controller for whatever it does with the data afterwards.",
        ],
      },
      {
        title: "Transfers outside the European Union",
        paragraphs: [
          "Google, Meta and Cloudflare may process data in the United States. The transfer relies on the European Commission's adequacy decision of 10 July 2023 (EU-US Data Privacy Framework), which these companies have joined, and on standard contractual clauses.",
        ],
      },
      {
        title: "How long",
        paragraphs: [
          "Technical browsing data stays in the server logs only as long as needed for security.",
          "Each cookie's lifetime is listed in the cookie policy. Emails are kept as long as we need them to handle your request.",
        ],
      },
      {
        title: "Children",
        paragraphs: ["The site is meant for parents. We do not knowingly collect data directly from children under 14, and our advertising is not aimed at children."],
      },
      {
        title: "Your rights",
        paragraphs: [
          `You can ask to access your data, correct it, delete it, restrict its use, receive it in a portable format and object to its processing (Art. 15-22 GDPR). You can withdraw consent at any time from "Cookie preferences" at the bottom of every page; withdrawal does not affect what happened before. To exercise your rights, write to ${o(OWNER.privacyEmail)}.`,
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
      {
        title: "How consent works",
        paragraphs: [
          "On your first visit a banner asks what you accept. Until you choose, the site only uses technical cookies and your browser does not contact Google or Meta. Closing the banner with the X counts as refusing.",
          "We ask again after 6 months, or sooner if purposes or providers change. You can change your mind at any time from \"Cookie preferences\" at the bottom of every page.",
        ],
      },
      { title: "Technical", paragraphs: ["Needed for the site to work and to remember your cookie choice. They do not require consent."] },
      {
        title: "Statistics",
        paragraphs: ["With your consent we use Google Analytics to count visits and page views. We use Google Consent Mode: without consent the script is not loaded."],
      },
      {
        title: "Marketing and remarketing",
        paragraphs: [
          "With your consent we use Google Ads and the Meta Pixel to know whether a visit came from one of our ads and to show our ads to people who have visited the site. The Meta Pixel does not read form fields and sends no events from the pre-registration page.",
        ],
      },
      {
        title: "Managing cookies in your browser",
        paragraphs: ["You can also delete or block cookies in your browser settings. If you block technical cookies, the site may ask for your choice on every visit."],
      },
      {
        title: "Providers' policies",
        paragraphs: [],
        items: ["Google: policies.google.com/privacy and business.safety.google/adscookies", "Meta: facebook.com/privacy/policy and facebook.com/policies/cookies"],
      },
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
