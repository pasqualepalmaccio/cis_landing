import type { Dict } from "./it";

/* English copy. Same keys as it.ts, enforced by the Dict type. */

export const en: Dict = {
  meta: {
    title: "CIS · Colico International School",
    description:
      "A new international school on Lake Como, in Colico. Opening September 2027. Register your interest and we'll let you know when pre-enrolment opens.",
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
    cta: "I'm interested",
    back: "Back to site",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },
  hero: {
    eyebrow: "The new international school on the north shore · Opening September 2027",
    titleLines: ["The world as a classroom.", "The lake as home."],
    sub: "An international school for children aged 3 to 14.",
    cta: "Discover the project",
    secondary: "Get early updates",
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
          "Multilingual, multicultural environment from Pre-K",
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
          "Nursery/Pre-primary (3–5) · Primary (6–10) · Lower Secondary (11–14)",
          "English + Italian as core languages",
          "French, German and Spanish from primary. Mandarin and Russian optional",
        ],
      },
    ],
  },
  curriculum: {
    eyebrow: "Our curriculum",
    title: "What this means in practice",
    cards: [
      {
        kicker: "Pre-K and Primary",
        title: "Theme- and inquiry-based learning",
        body: "Our approach organises learning into thematic units (for example \"Our Planet\" or \"Ancient Civilisations\") that connect science, history, geography, art and language into one storyline instead of keeping them apart. Each unit works on knowledge, skills and a character trait at the same time, such as resilience, cooperation or respect.",
      },
      {
        kicker: "Lower Secondary",
        title: "Concept- and global-context-based learning",
        body: "From 11 to 14, students learn through concepts and inquiry. Projects pull several subjects together and tie them to real problems. It's the groundwork for a pathway that universities around the world recognise. We are working to obtain formal affiliation with the relevant international education organisations over time.",
      },
    ],
    more: "See how it works in detail",
    equivalence: null,
  },
  access: {
    eyebrow: "Why Colico",
    title: "Easy to reach, at the heart of the upper lake",
    lead: "Colico is the hub of the upper lake: the SS36 expressway from Lecco, the railway and the lake's boat lines all arrive here. Here is how long it takes from the nearby towns.",
    routes: [
      { town: "Lecco", ways: [{ mode: "By car · SS36", minutes: 35 }, { mode: "By train", minutes: 42 }] },
      { town: "Menaggio", ways: [{ mode: "By car", minutes: 40 }, { mode: "By hydrofoil", minutes: 30 }] },
      { town: "Chiavenna", ways: [{ mode: "By car · SS36", minutes: 30 }, { mode: "By train", minutes: 30 }] },
      { town: "Sondrio", ways: [{ mode: "By car · SS38", minutes: 40 }, { mode: "By train", minutes: 40 }] },
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
        title: "A break dedicated to reading",
        body: "One of the three daily breaks is set aside for silent, individual reading, in whatever language the child picks, mother tongue included. Back in class, children retell those books, summarise them and talk them over with classmates. Reading becomes a habit, and often a pleasure, from the very first years.",
        highlight: true,
      },
      {
        tag: "Communication",
        title: "Communication as a core competency",
        body: "To us, speaking with confidence matters as much as any subject. From the first years, children learn to explain an idea clearly, to speak in front of others and to really listen to people who disagree before answering. At CIS they practise it every day in class.",
        highlight: true,
      },
      {
        tag: "Homework",
        title: "No homework until age 10",
        body: "Lessons are structured so that work is completed in class, within the normal school day, without relying on optional afternoon services. Afternoons and evenings belong to the family.",
        highlight: true,
      },
      {
        tag: "Zero screens",
        title: "A mindful approach to screens",
        body: "At school, devices come out only when a lesson needs them, for example differentiated maths exercises or learning to use digital tools properly. We suggest a few common-sense rules for home as well, mostly to keep younger children away from social media.",
        highlight: false,
      },
      {
        tag: "Uniform",
        title: "Removes visible differences",
        body: "Builds identity and belonging, simplifies mornings, puts everyone on equal footing.",
        highlight: false,
      },
      {
        tag: "Calendar",
        title: "~185 days, regular breaks",
        body: "September to June, with a break roughly every two months so nobody runs out of steam.",
        highlight: false,
      },
    ],
  },
  safety: {
    eyebrow: "Safety and safeguarding",
    title: "Clear rules, consistently applied",
    lead: "Some rules are not up for discussion. Parents should be able to check them, not just read them.",
    cards: [
      {
        title: "Staff",
        items: [
          "International criminal background check and mandatory references for all staff",
          "Designated safeguarding lead, a single point of contact for any concern",
          "Published child-protection protocol, available to every family",
        ],
      },
      {
        title: "Spaces and supervision",
        items: [
          "\"Never alone\" rule: no adult is ever alone with a child",
          "Glazed classroom walls, always visible",
          "Open-door access for parents, no notice required",
        ],
      },
      {
        title: "Transport",
        items: [
          "Bus badge system: parents get an SMS the moment their child boards and gets off",
          "Included in the fees, no extra cost",
          "The driver is alerted immediately if a child exits at the wrong stop",
        ],
      },
      {
        title: "Personal data",
        items: [
          "Attendance and location data used solely for safety purposes",
          "Explicit parental consent collected at enrolment, GDPR-compliant",
        ],
      },
    ],
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
      { name: "Pre-K", ages: "ages 3–5", nsaf: 2000, tuition: 10500, registration: 1100 },
      { name: "Grade 1–5", ages: "ages 6–10/11", nsaf: 2000, tuition: 15000, registration: 1100 },
    ],
    schedule: {
      title: "Payment schedule for the 2027/28 school year",
      lead: "Five instalments, from enrolment to the end of the first year.",
      head: { instalment: "Instalment", due: "Due date" },
      rows: [
        { id: "P1", due: "Oct–Dec 2026", what: "NSAF + registration", prek: 3100, grade: 3100 },
        { id: "P2", due: "June 2027", what: "25% tuition", prek: 2625, grade: 3750 },
        { id: "P3", due: "October 2027", what: "25% tuition", prek: 2625, grade: 3750 },
        { id: "P4", due: "December 2027", what: "25% tuition", prek: 2625, grade: 3750 },
        { id: "P5", due: "March 2028", what: "25% tuition", prek: 2625, grade: 3750 },
      ],
      total: "Total (NSAF + registration + tuition)",
    },
    notes: [
      "* School materials (books, approx. €750) billed in June together with P2. Cafeteria (approx. €1,650/year, optional) billed in 3 instalments together with P3, P4 and P5. Bus (approx. €1,200/year, optional) invoiced separately.",
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
        ],
        highlight: "Registrations open",
      },
      { when: "January-August 2027", title: "Pre-opening", body: "Fitting out the premises, first teachers, open day, bus service activation, enrolment campaign.", items: [], highlight: null },
      { when: "September 2027", title: "The International Primary opens", body: "The first students arrive, aged 3 to 8. The bus is running and the parents' council is up.", items: [], highlight: null },
      { when: "2028-2031", title: "The school grows", body: "Lower Secondary opens. The first Primary children carry on here, and the school reaches 120 students.", items: [], highlight: null },
    ],
  },
  interest: {
    eyebrow: "Pre-registration",
    title: "Want to hear first?",
    lead: "Pre-enrolment opens in autumn 2026. Fill in the form and we'll write to you before anyone else, with priority on the list.",
    cta: "Go to the registration form",
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
    motto: "Ex altis lux",
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
      kicker: "Pre-K and Primary · ages 3–10",
      title: "Pre-K and Primary: theme- and inquiry-based learning",
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
      kicker: "Lower Secondary · ages 11–14",
      title: "Lower Secondary: concept- and global-context-based learning",
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
      body: "Primary and Lower Secondary follow the same idea: learning by inquiry, with personal and international goals next to subject goals. That's why moving from one to the other feels natural. Many international schools work like this.",
    },
    after: {
      kicker: "Frequently asked",
      title: "And after age 14?",
      cards: [
        {
          title: "Our growth vision",
          body: "Further ahead, we'd like to take Lower Secondary up to age 16 and look at an international pre-university pathway (16–18) as our first classes grow. There are no dates yet, because it depends on how the school grows. It is the direction, together with affiliation to the international education organisations.",
        },
        {
          title: "If the school hasn't extended yet",
          body: "Our Lower Secondary approach is designed to be fully compatible with the most widely used international pathways: a student who completes our first 3 years (11–14) can move on to another international school, in Italy or abroad, without trouble.",
        },
      ],
    },
    cta: "Register your interest",
  },
};
