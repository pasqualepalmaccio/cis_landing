import type { Dict } from "./it";

/* English copy. Same keys as it.ts, enforced by the Dict type. */

export const en: Dict = {
  meta: {
    title: "CIS · Colico International School",
    description:
      "A new international school on Lake Como, in Colico. Opening September 2027. Register your interest for the pre-enrolment campaign.",
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
  marquee: ["English", "Italiano", "Français", "Deutsch", "Español", "中文", "Русский"],
  vision: {
    eyebrow: "Our vision",
    title: "A lifelong asset, not just a curriculum",
    lead: "Designed together for children, parents and teachers — with one goal: raising people who know how to think and how to do.",
    cards: [
      {
        title: "For the children",
        items: [
          "Multilingual, multicultural environment from Pre-K",
          "Outdoor learning built into the curriculum, not just recess",
          "Hands-on making in class: gardening, woodworking, cooking — knowing how to think and how to do",
        ],
      },
      {
        title: "For parents",
        items: [
          "Extended hours *(optional, paid add-on)* until 18:30 — sport and workshops",
          "Occasional “Parent in class” days, to share a school moment together",
          "Dedicated shuttles across the whole Alto Lago area",
        ],
      },
      {
        title: "For teachers",
        items: [
          "Small classes, full teaching autonomy",
          "Treated as founding partners, not employees",
          "Housing support in one of Italy's most beautiful regions",
        ],
      },
      {
        title: "Age groups & languages",
        items: [
          "Nursery/Pre-primary (3–5) · Primary (6–10) · Lower Secondary (11–14)",
          "English + Italian as core languages",
          "French, German, Spanish from primary — Mandarin and Russian optional",
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
        body: "Our approach organises learning into thematic units (e.g. “Our Planet”, “Ancient Civilisations”) that connect science, history, geography, art and language into a single storyline instead of isolated subjects. Each unit develops knowledge, skills, and a personal character trait (resilience, cooperation, respect) in parallel — in the spirit of leading international standards for early years and primary education.",
      },
      {
        kicker: "Lower Secondary",
        title: "Concept- and global-context-based learning",
        body: "For students aged 11–14, an approach built around concept- and inquiry-based learning, connecting subjects to each other and to the real world through interdisciplinary projects — laying the groundwork for a pathway recognised by universities worldwide. We are working to obtain formal affiliation with the relevant international education organisations over time.",
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
    lead: "An early look at the renovation project — spaces designed for outdoor learning and small classes.",
    hero: { caption: "The campus — full view", alt: "Rendering of the school building entrance" },
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
        body: "One of the three daily breaks is set aside for silent, individual reading — in whatever language the child chooses, including their mother tongue. Those books then become the basis for sharing and discussion activities in class: retelling, summarising and discussing the books in front of classmates. A simple way to build the pleasure and habit of reading from the earliest years.",
        highlight: true,
      },
      {
        tag: "Communication",
        title: "Communication as a core competency",
        body: "We believe confident communication is as essential as any academic subject. From their earliest years, our students learn to present ideas clearly, speak with conviction in front of others, and listen actively — engaging fully with different perspectives before responding to them. These are the skills that turn knowledge into leadership, and they are woven into everyday learning at CIS, not left to chance.",
        highlight: true,
      },
      {
        tag: "Homework",
        title: "No homework until age 10",
        body: "Lessons are structured so that work is completed in class, within the regular school day — not dependent on optional afternoon services. Evenings and afternoons stay free for family time.",
        highlight: true,
      },
      {
        tag: "Zero screens",
        title: "A mindful approach to screens",
        body: "At school, devices are used only when genuinely useful for learning — for example, differentiated maths activities or structured digital literacy. We encourage families to follow a few simple common-sense guidelines at home too, in the spirit of the international trend toward protecting younger children from early or excessive social media use.",
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
        body: "September–June with regular breaks every 2 months: less burnout, more balance.",
        highlight: false,
      },
    ],
  },
  safety: {
    eyebrow: "Safety & safeguarding",
    title: "Clear rules, consistently applied",
    lead: "Some policies are not negotiable — because parents' trust is built on verifiable practice, not promises.",
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
        title: "Spaces & supervision",
        items: [
          "“Never alone” policy: no adult is ever left alone with a child",
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
    title: "Transparent fees, from day one",
    lead: "Three simple line items to understand — no surprises during the year.",
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
      title: "Payment schedule for the 2027–2028 school year",
      lead: "Five instalments spread between enrolment and the first school year.",
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
    lead: "A real project with clear milestones — not just an idea on paper.",
    steps: [
      { when: "Now → September 2026", title: "Validation & municipal agreement", body: "Survey of 200+ families, first agreements with schools and local partners.", items: [], highlight: null },
      {
        when: "September – December 2026",
        title: "The school takes shape",
        body: "",
        items: [
          "The headteacher and founding team join the project",
          "Ministry (MIUR) recognition process begins",
          "International curriculum confirmed",
        ],
        highlight: "Registrations open",
      },
      { when: "January – August 2027", title: "Pre-opening", body: "Fitting out the premises, first teachers, open day, bus service activation, enrolment campaign.", items: [], highlight: null },
      { when: "September 2027", title: "Opening — International Primary", body: "First students welcomed, ages 3–8, bus operating, parents' council active.", items: [], highlight: null },
      { when: "2028 – 2031", title: "Growth toward full capacity", body: "Lower Secondary opens: the school community grows, the first Primary students continue their journey, up to 120 students.", items: [], highlight: null },
    ],
  },
  interest: {
    eyebrow: "Pre-registration",
    title: "Be among the first to know",
    lead: "The official pre-enrolment campaign launches in autumn 2026. Fill in the registration form to get early updates and a priority spot on the list.",
    cta: "Go to the registration form",
    note: "A few minutes — no commitment, this is a first step, not a formal enrolment.",
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
      description: "Our teaching approach for children aged 3 to 14: how it actually works.",
    },
    eyebrow: "Our curriculum",
    title: "Our teaching approach:",
    titleEm: "how it actually works",
    lead: "A complete guide to our educational method for your children aged 3 to 14 — what students experience, what teachers do, and why we chose it.",
    path: {
      kicker: "Our path",
      title: "Toward international recognition",
      paragraphs: [
        "The leading international education programmes require schools to follow a formal accreditation process: the school submits an application, is evaluated by an independent body, and is ultimately granted official recognition, valid for a defined period. It's a serious process that takes time — and one we intend to pursue.",
        "In the meantime, several of our founding teachers have direct experience teaching accredited international curricula, holding professional certifications earned at other schools where they've already applied these approaches. Our goal is to bring that same quality and rigour to the school in Colico, and complete our own accreditation path once the conditions are right.",
      ],
    },
    primary: {
      kicker: "Pre-K and Primary · ages 3–10",
      title: "Pre-K and Primary: theme- and inquiry-based learning",
      lead: "Our approach organises learning into thematic units that connect multiple subjects into a single storyline, instead of teaching them separately — a model used in many leading international schools.",
      processTitle: "How it works: the 5-stage process",
      steps: [
        { title: "Starting point", body: "An engaging, hands-on start" },
        { title: "What we already know", body: "What children already know" },
        { title: "The theme", body: "An overview of what's ahead" },
        { title: "Research & reflect", body: "The heart of the work" },
        { title: "Ending point", body: "Children showcase their work" },
      ],
      cards: [
        {
          title: "General principles",
          items: [
            "**Subject goals** — the specific skills of each academic subject",
            "**Personal goals** — eight qualities: adaptability, communication, collaboration, empathy, ethics, resilience, respect, critical thinking",
            "**International goals** — understanding different cultures, a global mindset",
          ],
          paragraphs: [],
        },
        {
          title: "Pedagogical foundations",
          items: [
            "Active learning — hands and minds engaged, not passive listening",
            "Connecting new knowledge to what's already known",
            "Metacognition — reflecting on *how* you're learning, not just *what*",
          ],
          paragraphs: [],
        },
        {
          title: "For students",
          items: [],
          paragraphs: [
            "Learning is experienced as an engaging inquiry, not isolated subjects. The skills developed are built for a fast-changing world — many of tomorrow's jobs don't exist yet.",
            "Assessment happens in developmental stages (beginning → developing → mastering), with plenty of room for self-assessment to build motivation and self-awareness.",
          ],
        },
        {
          title: "For teachers",
          items: [],
          paragraphs: [
            "A clear but flexible structure: full teaching freedom on how to deliver each unit, adapted to their students, while the framework keeps consistency across core learning goals (including maths, English, science).",
            "Designed to integrate with national curricula, not replace them — which is exactly why it pairs well with Italian system requirements.",
          ],
        },
      ],
    },
    secondary: {
      kicker: "Lower Secondary · ages 11–14",
      title: "Lower Secondary: concept- and global-context-based learning",
      lead: "For students aged 11–14, an approach built around key concepts and real global contexts — the foundation for a future internationally recognised pathway. We are working to obtain formal affiliation with the relevant international education organisations over time.",
      cards: [
        {
          title: "How it works",
          items: [
            "**Multiple integrated subject areas** — languages, humanities and social sciences, sciences, mathematics, arts, physical and health education, design",
            "**Concept-driven teaching** — every unit links key concepts to real global contexts",
            "**Interdisciplinary units** — at least one project per year connecting two or more subjects",
          ],
          paragraphs: [],
          wide: false,
        },
        {
          title: "For students",
          items: [],
          paragraphs: [
            "Students learn to connect what they study to the real world, building critical thinking, research, and collaboration skills that stay useful well beyond school.",
            "The pathway builds the foundation for a future internationally recognised diploma, accepted by universities worldwide.",
          ],
          wide: false,
        },
        {
          title: "For teachers",
          items: [],
          paragraphs: [
            "The framework doesn't prescribe a rigid subject-by-subject curriculum: teachers build learning units through collective planning, connecting subjects to each other and to global contexts. This requires more collaboration between colleagues than traditional siloed subject teaching — but also gives more creative freedom in how they teach.",
          ],
          wide: true,
        },
      ],
    },
    why: {
      title: "Why this combination",
      body: "Our approach for Primary and Lower Secondary share the same underlying philosophy — inquiry-based learning, personal and international goals alongside subject ones — making the move from Primary to Lower Secondary feel natural, not a change of system. It's a model used by international schools worldwide.",
    },
    after: {
      kicker: "Frequently asked",
      title: "And after age 14?",
      cards: [
        {
          title: "Our growth vision",
          body: "Our long-term goal is to extend our Lower Secondary pathway to age 16, and evaluate introducing an international pre-university pathway (16–18), growing alongside our first cohorts. This isn't yet a commitment tied to a specific date — it depends on the school's growth — but it's the direction we're working toward, alongside formal affiliation with the relevant international education organisations.",
        },
        {
          title: "If the school hasn't extended yet",
          body: "Our Lower Secondary approach is designed to be fully compatible with the most widely used international pathways: a student who completes our first 3 years (11–14) can confidently continue at another international school, in Italy or abroad. It's not a dead end — it's a solid starting point.",
        },
      ],
    },
    cta: "Register your interest",
  },
};
