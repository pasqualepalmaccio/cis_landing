import type { Dict } from "./it";

/* English copy. Same keys as it.ts, enforced by the Dict type. */

export const en: Dict = {
  meta: {
    title: "CIS · Colico International School",
    description:
      "CIS · Colico International School is the new international school in Colico, on Lake Como: children aged 3 to 14, English and Italian as the main languages, opening September 2027.",
  },
  nav: {
    links: [
      { href: "#visione", label: "Our vision" },
      { href: "#curricolo", label: "Curriculum" },
      { href: "#campus", label: "Campus" },
      { href: "#rette", label: "Fees" },
      { href: "#sicurezza", label: "Safety" },
      { href: "#percorso", label: "Timeline" },
    ],
    cta: "Pre-register now",
    back: "Back to site",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },
  ica: {
    short: "We **intend to implement** the IEYC and IPC, subject to finalising our agreement with the International Curriculum Association (ICA).",
    full: "Colico International School **intends to implement** the International Early Years Curriculum (IEYC) and the International Primary Curriculum (IPC), subject to finalising our agreement with the International Curriculum Association (ICA).",
    disclaimer: "IEYC and IPC are created by the International Curriculum Association (ICA). Colico International School intends to implement them and is not yet a subscribing school.",
    link: "Discover the International Curriculum Association",
    href: "https://www.internationalcurriculum.com",
    alts: {
      badge: "International Curriculum Association: IEYC and IPC",
      ieyc: "IEYC, International Early Years Curriculum",
      ipc: "IPC, International Primary Curriculum",
    },
  },
  hero: {
    eyebrow: "Opening September 2027 · Ages 3 to 14",
    titleLines: ["International school in\u00a0Colico,", "on Lake Como"],
    sub: "The world as a classroom, the lake as home.",
    explore: "Discover the project",
    cta: "Secure a spot among the first",
    scroll: "Scroll",
    facts: [
      { value: "3–14", label: "years old" },
      { value: "2027", label: "opening" },
      { value: "120", label: "students at capacity" },
    ],
  },
  vision: {
    eyebrow: "Our vision",
    title: "What stays with them after school",
    lead: "We designed it for children, parents and teachers. The idea is simple: raise kids who can think things through and get things done.",
    cards: [
      {
        title: "For the children",
        items: [
          "Multilingual, multicultural environment from Nursery",
          "Lessons happen outdoors too, as part of the curriculum",
          "Gardening, woodworking and cooking in class",
        ],
      },
      {
        title: "For parents",
        items: [
          "Extended hours until 18:30 with sport and workshops *(optional, paid)*",
          "\"Parent in class\" days: spend a morning at school with your child",
          "Dedicated shuttles across the whole Alto Lago area",
        ],
      },
      {
        title: "For teachers",
        items: [
          "Small classes, full teaching autonomy",
          "They join as founding partners in the project",
          "Housing support in one of Italy's most beautiful regions",
        ],
      },
      {
        title: "Age groups and languages",
        items: [
          "Nursery – Year 1 (3–6) · Year 2 – Year 6 (6–11) · Year 7 – Year 9 (11–14)",
          "English first. From age 6, Italian (3 hours a week) and a third language (2 hours a week)",
          "Third language: French, German or Spanish. Mandarin and Russian optional",
        ],
      },
    ],
  },
  curriculum: {
    eyebrow: "Our curriculum",
    title: "What this means in practice",
    cards: [
      {
        kicker: "Nursery – Year 6 · ages 3–11",
        title: "Theme- and inquiry-based learning",
        body: "Our approach organises learning into thematic units (for example \"Our Planet\" or \"Ancient Civilisations\") that connect science, history, geography, art and language into one storyline instead of keeping them apart. Each unit works on knowledge, skills and a character trait at the same time, such as resilience, cooperation or respect.",
      },
      {
        kicker: "Year 7 – Year 9 · ages 11–14",
        title: "Concept- and global-context-based learning",
        body: "From 11 to 14, students learn through concepts and inquiry. Projects pull several subjects together and tie them to real problems. It's the groundwork for a pathway that universities around the world recognise. We are working to obtain formal affiliation with the relevant international education organisations over time.",
      },
    ],
    more: "See how it works in detail",
    compare: {
      eyebrow: "Equivalence with the Italian system",
      title: "Ages and year groups compared",
      head: { stage: "Stage", england: "England", ages: "Ages", born: "Born", italy: "Italy (approx.)", status: "Sept 2027" },
      born: "Sep {from} – Aug {to}",
      status: { open: "Open", gradual: "Progressively", later: "Later" },
      legend: "EYFS = Early Years Foundation Stage · KS = Key Stage. Ages during the 2027/28 school year. Italian classes follow the calendar year, so the equivalence is approximate.",
      opening: "At opening, in September 2027, we start with Nursery to Year 3 (ages 3–8). Further year groups open progressively.",
      note: "**Good to know:** if enough children enrol, we can also open classes up to Year 5 (age 10) in September 2027, with a summer English preparation programme for new pupils.",
    },
    equivalence: null,
  },
  access: {
    eyebrow: "Why Colico",
    title: "Easy to reach, at the heart of the upper lake",
    lead: "Colico is the hub of the upper lake: the SS36 expressway from Lecco, the railway and the lake's boat lines all arrive here. Here is how long it takes from the nearby towns.",
    destination: { place: "CIS · Colico", note: "Your destination" },
    modes: { car: "Car", train: "Train", ferry: "Hydrofoil" },
    routes: [
      { town: "Lecco", ways: [{ by: "car", road: "SS36", minutes: 35 }, { by: "train", road: "", minutes: 42 }] },
      { town: "Menaggio", ways: [{ by: "car", road: "", minutes: 40 }, { by: "ferry", road: "", minutes: 30 }] },
      { town: "Chiavenna", ways: [{ by: "car", road: "SS36", minutes: 30 }, { by: "train", road: "", minutes: 30 }] },
      { town: "Sondrio", ways: [{ by: "car", road: "SS38", minutes: 40 }, { by: "train", road: "", minutes: 40 }] },
    ],
    note: "Approximate times in regular traffic (the SS36 can slow down at peak hours) and based on Trenord timetables; the boat to Menaggio runs on seasonal timetables. Always check the latest times before travelling.",
  },
  campus: {
    eyebrow: "The future campus",
    title: "Simple, warm, welcoming",
    lead: "An early look at the renovation: spaces for small classes and outdoor lessons.",
    hero: { caption: "The campus, full view", alt: "Rendering of the school building entrance" },
    gallery: [
      { src: "/images/sede-aula.jpg", caption: "Inside classroom", alt: "Rendering of a classroom interior" },
      { src: "/images/sede-giochi.jpg", caption: "Playground upgrade", alt: "Rendering of the playground" },
      { src: "/images/sede-esterno.jpg", caption: "Outdoor class area", alt: "Rendering of the outdoor classroom area" },
    ],
    note: "* Illustrative renderings of the actual site, as it will look after renovation.",
  },
  philosophy: {
    eyebrow: "School philosophy",
    title: "Some choices are not negotiable",
    cards: [
      {
        tag: "Reading",
        image: { src: "/images/filosofia-lettura.jpg", alt: "A pupil reading a book in the library", position: "50% 100%" },
        title: "A break dedicated to reading",
        body: "One of the three daily breaks is set aside for silent, individual reading, in whatever language the child picks, mother tongue included. Back in class, children retell those books, summarise them and talk them over with classmates. Reading becomes a habit, and often a pleasure, from the very first years.",
      },
      {
        tag: "Communication",
        image: { src: "/images/filosofia-comunicazione.jpg", alt: "A pupil presenting to the class", position: "50% 10%" },
        title: "Communication as a core competency",
        body: "To us, speaking with confidence matters as much as any subject. From the first years, children learn to explain an idea clearly, to speak in front of others and to really listen to people who disagree before answering. At CIS they practise it every day in class.",
      },
      {
        tag: "Homework",
        image: { src: "/images/filosofia-compiti.jpg", alt: "A notepad with the word homework crossed out", position: "50% 50%" },
        title: "No homework until age 10",
        body: "Lessons are structured so that work is completed in class, within the normal school day, without relying on optional afternoon services. Afternoons and evenings belong to the family.",
      },
      {
        tag: "Zero screens",
        image: { src: "/images/filosofia-schermi.jpg", alt: "A child exploring a plant with a magnifying glass", position: "50% 28%" },
        title: "A mindful approach to screens",
        body: "At school, devices come out only when a lesson needs them, for example differentiated maths exercises or learning to use digital tools properly. We suggest a few common-sense rules for home as well, mostly to keep younger children away from social media.",
      },
      {
        tag: "Uniform",
        image: { src: "/images/filosofia-uniforme.jpg", alt: "Three CIS pupils in navy uniform polo shirts with the school crest", position: "50% 35%" },
        title: "Removes visible differences",
        body: "Builds identity and belonging, simplifies mornings, puts everyone on equal footing.",
      },
    ],
    calendar: {
      tag: "Calendar",
      title: "2027/28: real breaks, a shorter summer",
      first: "First day",
      last: "Last day",
      back: "Back",
      breaks: { autumn: "Autumn", christmas: "Christmas", carnival: "Carnival", spring: "Spring" },
      daysOff: "{n} days off",
      stats: [
        { value: "175", label: "school days" },
        { value: "5 weeks", label: "of breaks during the year" },
        { value: "11.5 weeks", label: "of summer, against 14 in Italian schools" },
        { value: "8:30–15:30", label: "school day, with after-school club until 17:30" },
      ],
      note: "Christmas aligned with Italian schools. Also closed on 8 December, Easter Monday and 2 June. Optional camps in summer and during breaks.",
    },
    imagesNote: "Illustrative images.",
  },
  safety: {
    eyebrow: "Safety and safeguarding",
    title: "Clear rules, consistently applied",
    lead: "Some rules are not up for discussion. Parents should be able to check them, not just read them.",
    cards: [
      {
        title: "Staff",
        image: { src: "/images/sicurezza-personale.jpg", alt: "Three CIS staff members with lanyards", position: "50% 20%" },
        items: [
          "International criminal background check and mandatory references for all staff",
          "Designated safeguarding lead, a single point of contact for any concern",
          "Published child-protection protocol, available to every family",
        ],
      },
      {
        title: "Spaces and supervision",
        image: { src: "/images/sicurezza-spazi.jpg", alt: "Children playing football outside with a teacher watching", position: "50% 55%" },
        items: [
          "\"Never alone\" rule: no adult is ever alone with a child",
          "Glazed classroom walls, always visible",
          "Open-door access for parents, no notice required",
        ],
      },
      {
        title: "Transport",
        image: { src: "/images/sicurezza-bus.jpg", alt: "Children boarding the yellow CIS school bus", position: "50% 50%" },
        items: [
          "Bus badge system: parents get an SMS the moment their child boards and gets off",
          "Included in the fees, no extra cost",
          "The driver is alerted immediately if a child exits at the wrong stop",
        ],
      },
      {
        title: "Personal data",
        image: { src: "/images/sicurezza-dati.jpg", alt: "A laptop showing a security shield with a padlock", position: "80% 50%" },
        items: [
          "Attendance and location data used solely for safety purposes",
          "Explicit parental consent collected at enrolment, GDPR-compliant",
        ],
      },
    ],
    imagesNote: "Illustrative images.",
  },
  fees: {
    eyebrow: "Fees",
    title: "All the fees, up front",
    lead: "Three items, and nothing gets added during the year.",
    labels: {
      nsaf: "NSAF",
      nsafNote: "one-time, at enrolment",
      tuition: "Annual tuition",
      registration: "Annual registration",
      total: "Total annual recurring",
      totalNote: "excl. NSAF, meals, bus",
    },
    tiers: [
      { name: "Nursery – Year 1", ages: "ages 3–6", nsaf: 2000, tuition: 10500, registration: 1100 },
      { name: "Year 2 – Year 6", ages: "ages 6–11", nsaf: 2000, tuition: 15000, registration: 1100 },
    ],
    schedule: {
      title: "Payment schedule for the 2027/28 school year",
      lead: "Five instalments, from enrolment to the end of the first year.",
      head: { instalment: "Instalment", due: "Due date" },
      rows: [
        { id: "P1", due: "Dec 2026–Jan 2027", what: "NSAF + registration", prek: 3100, grade: 3100 },
        { id: "P2", due: "June 2027", what: "25% tuition", prek: 2625, grade: 3750 },
        { id: "P3", due: "October 2027", what: "25% tuition", prek: 2625, grade: 3750 },
        { id: "P4", due: "December 2027", what: "25% tuition", prek: 2625, grade: 3750 },
        { id: "P5", due: "March 2028", what: "25% tuition", prek: 2625, grade: 3750 },
      ],
      total: "Total (NSAF + registration + tuition)",
      note: "* School materials (books, approx. €750) billed in June together with P2. Cafeteria (approx. €1,650/year, optional) billed in 3 instalments together with P3, P4 and P5. Bus (approx. €1,200/year, optional) invoiced separately.",
    },
    notes: [
      "* NSAF: New Student Admission Fee, paid once at enrolment. Fees exclude meals, bus and materials.",
    ],
  },
  timeline: {
    eyebrow: "The timeline",
    title: "From validation to opening day",
    lead: "The milestones, with the dates we have today.",
    steps: [
      { when: "Until September 2026", title: "Validation and agreement with the town", body: "A survey of more than 200 families and first agreements with local schools and partners.", items: [], highlight: null },
      {
        when: "September-December 2026",
        title: "The school takes shape",
        body: "",
        items: [
          "The headteacher and founding team join the project",
          "Ministry (MIUR) recognition under way",
          "International curriculum confirmed",
          "\"Meet & Discover\" meetings with families (November-December)",
        ],
        highlight: "Registrations open",
      },
      { when: "20 January 2027", title: "Opening confirmed, based on enrolments", body: "The day we decide. If enrolments reach the required threshold, we confirm the September 2027 opening and works begin. Families who commit early are what make this moment happen.", items: [], highlight: null },
      { when: "January-August 2027", title: "Pre-opening", body: "Fitting out the premises, first teachers, Meet & Discover, bus service activation, enrolment campaign.", items: ["Works completed between May and June"], highlight: null },
      { when: "September 2027", title: "Opening: Nursery to Year 3", body: "The first students arrive, aged 3 to 8. The bus is running and the parents' council is up.", items: [], highlight: null },
      { when: "2028-2031", title: "The school grows", body: "Year 7–9 open. The first pupils continue their journey here, and the school reaches 120 students.", items: [], highlight: null },
    ],
  },
  interest: {
    eyebrow: "Pre-registration",
    title: "Secure a spot among the first families",
    lead: "Pre-enrolment opens in autumn 2026. Fill in the form and we'll write to you before anyone else, with priority on the list.",
    cta: "Complete your pre-registration",
    note: "It takes a few minutes and commits you to nothing. It isn't an enrolment.",
  },
  footer: {
    place: "Colico, Lake Como, Italy",
    contact: "Contact",
    project: "The project",
    links: [
      { href: "#accesso", label: "Getting here" },
      { href: "#percorso", label: "Path to opening" },
    ],
    curriculum: "The curriculum in detail",
  },
  consent: {
    label: "Cookie consent",
    title: "Cookies",
    body: "We use technical cookies to make the site work. If you agree, we also use statistics and marketing cookies: they tell us where visits come from and let us show our ads to people who have already been here. You can change your mind at any time from \"Cookie preferences\" at the bottom of every page.",
    policy: "Cookie policy",
    accept: "Accept all",
    reject: "Reject",
    customize: "Let me choose",
    save: "Save choices",
    close: "Close and reject",
    preferencesTitle: "Cookie preferences",
    always: "Always on",
    purposes: {
      necessary: { title: "Technical", body: "Needed for the site to work and to remember your cookie choice." },
      statistics: { title: "Statistics", body: "{vendors} counts visits and page views. Data also reaches the United States." },
      marketing: { title: "Marketing and remarketing", body: "{vendors} measure how our ads perform and let us show them to people who have visited the site. Data also reaches the United States." },
    },
  },
  legal: {
    privacy: "Privacy policy",
    cookie: "Cookie policy",
    preferences: "Cookie preferences",
  },
  curriculumPage: {
    meta: {
      title: "Our curriculum · CIS",
      description: "How we teach children aged 3 to 14, explained properly.",
    },
    eyebrow: "Our curriculum",
    title: "Our teaching approach:",
    titleEm: "how it actually works",
    lead: "What your children do in class from 3 to 14, what the teachers do, and why we chose this method.",
    path: {
      kicker: "Our path",
      title: "Toward international recognition",
      paragraphs: [
        "The leading international education programmes require schools to follow a formal accreditation process: the school submits an application, is evaluated by an independent body, and is finally granted official recognition for a set number of years. It takes time, and we will do it.",
        "Meanwhile, several founding teachers have already taught accredited international curricula at other schools and hold the certifications to match. We want to bring that level to Colico and apply for accreditation as soon as the school is ready.",
      ],
    },
    primary: {
      kicker: "Nursery – Year 6 · ages 3–11",
      title: "Nursery – Year 6: theme- and inquiry-based learning",
      lead: "Our approach organises learning into thematic units that connect multiple subjects into a single storyline, instead of teaching them one at a time. Many international schools work this way.",
      processTitle: "How it works: the 5-stage process",
      steps: [
        { title: "Starting point", body: "An engaging, hands-on start" },
        { title: "What we already know", body: "What children already know" },
        { title: "The theme", body: "An overview of what's ahead" },
        { title: "Research and reflect", body: "The heart of the work" },
        { title: "Ending point", body: "Children showcase their work" },
      ],
      cards: [
        {
          title: "General principles",
          items: [
            "**Subject goals:** the skills of each subject",
            "**Personal goals:** eight qualities, namely adaptability, communication, collaboration, empathy, ethics, resilience, respect and critical thinking",
            "**International goals:** understanding cultures other than your own",
          ],
          paragraphs: [],
        },
        {
          title: "Pedagogical foundations",
          items: [
            "Children do things, they don't just sit and listen",
            "Connecting new knowledge to what's already known",
            "They also think about *how* they learn (metacognition)",
          ],
          paragraphs: [],
        },
        {
          title: "For students",
          items: [],
          paragraphs: [
            "For children, learning turns into an investigation. The skills are meant for a world that changes fast, where many of tomorrow's jobs don't exist yet.",
            "Assessment follows three stages (beginning, developing, mastering) and leaves plenty of room for self-assessment, which helps students know themselves and stay motivated.",
          ],
        },
        {
          title: "For teachers",
          items: [],
          paragraphs: [
            "Teachers decide how to run each unit and adapt it to their class. The framework keeps the core goals fixed, maths, English and science included.",
            "The method sits alongside national curricula without replacing them, so it fits well with Italian requirements.",
          ],
        },
      ],
    },
    secondary: {
      kicker: "Year 7 – Year 9 · ages 11–14",
      title: "Year 7 – Year 9: concept- and global-context-based learning",
      lead: "From 11 to 14, lessons start from key concepts and real situations around the world. It's the base for an internationally recognised pathway. We are working to obtain formal affiliation with the relevant international education organisations over time.",
      cards: [
        {
          title: "How it works",
          items: [
            "**Connected subject areas:** languages, humanities and social sciences, sciences, mathematics, arts, physical and health education, design",
            "**Concept-driven:** every unit ties a concept to a real case",
            "**Interdisciplinary:** at least one project a year that joins two or more subjects",
          ],
          paragraphs: [],
          wide: false,
        },
        {
          title: "For students",
          items: [],
          paragraphs: [
            "Students learn to connect what they study with what happens outside. They learn to reason, research and work in a team, and they keep those skills long after school.",
            "It prepares them for an international diploma that universities around the world accept.",
          ],
          wide: false,
        },
        {
          title: "For teachers",
          items: [],
          paragraphs: [
            "The framework doesn't prescribe a rigid subject-by-subject curriculum: teachers build learning units through collective planning, connecting subjects to each other and to global contexts. It takes more teamwork between colleagues than teaching subjects separately, but it also leaves more freedom in how to teach.",
          ],
          wide: true,
        },
      ],
    },
    why: {
      title: "Why this combination",
      body: "Nursery–Year 6 and Year 7–9 follow the same idea: learning by inquiry, with personal and international goals next to subject goals. That's why moving from Year 6 to Year 7 feels natural, not like a change of system. Many international schools work like this.",
    },
    after: {
      kicker: "Frequently asked",
      title: "And after age 14?",
      cards: [
        {
          title: "Our growth vision",
          body: "Further ahead, we'd like to extend our pathway beyond Year 9, to age 16, and look at an international pre-university pathway (16–18) as our first classes grow. There are no dates yet, because it depends on how the school grows. It is the direction, together with affiliation to the international education organisations.",
        },
        {
          title: "If the school hasn't extended yet",
          body: "Our Year 7–9 approach is designed to be fully compatible with the most widely used international pathways: a student who completes our first 3 years (11–14) can move on to another international school, in Italy or abroad, without trouble.",
        },
      ],
    },
    cta: "Register your interest",
  },
};
