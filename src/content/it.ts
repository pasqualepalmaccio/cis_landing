/* Testi della landing in italiano. È la forma di riferimento: la versione
   inglese deve avere esattamente le stesse chiavi (lo controlla il tipo Dict).
   Nei testi, **parola** è grassetto e *parola* è corsivo. */

export const it = {
  meta: {
    title: "CIS · Colico International School",
    description:
      "Una nuova scuola internazionale sul Lago di Como, a Colico. Apertura Settembre 2027. Registra il tuo interesse per la campagna di pre-iscrizione.",
  },
  nav: {
    links: [
      { href: "#visione", label: "Visione" },
      { href: "#curricolo", label: "Curricolo" },
      { href: "#campus", label: "Sede" },
      { href: "#rette", label: "Rette" },
      { href: "#sicurezza", label: "Sicurezza" },
      { href: "#percorso", label: "Percorso" },
    ],
    cta: "Sono interessato",
    back: "Torna al sito",
    menu: "Menu",
    close: "Chiudi",
    language: "Lingua",
  },
  hero: {
    eyebrow: "La nuova scuola internazionale del Nord Lago · Apertura Settembre 2027",
    titleLines: ["Il mondo come aula.", "Il Lago come casa."],
    sub: "Una scuola internazionale per bambini dai 3 ai 14 anni.",
    cta: "Scopri il progetto",
    secondary: "Ricevi aggiornamenti in anteprima",
    scroll: "Scorri",
    facts: [
      { value: "3–14", label: "anni" },
      { value: "2027", label: "apertura" },
      { value: "120", label: "studenti a regime" },
    ],
  },
  marquee: ["English", "Italiano", "Français", "Deutsch", "Español", "中文", "Русский"],
  vision: {
    eyebrow: "La nostra visione",
    title: "Un patrimonio per la vita, non solo un curricolo",
    lead: "Pensata insieme per bambini, genitori e insegnanti — con un obiettivo: crescere persone capaci di pensare e di fare.",
    cards: [
      {
        title: "Per i bambini",
        items: [
          "Ambiente multilingue e multiculturale, fin dal Pre-K",
          "Apprendimento all'aperto integrato nel curricolo, non solo ricreazione",
          "Attività manuali in classe: orto, falegnameria, cucina — sapere pensare e sapere fare",
        ],
      },
      {
        title: "Per i genitori",
        items: [
          "Orario esteso *(opzionale, a pagamento)* fino alle 18:30 — sport e laboratori",
          "Giornate «Un genitore in classe», per vivere insieme un momento di scuola",
          "Navette dedicate su tutto l'Alto Lago",
        ],
      },
      {
        title: "Per gli insegnanti",
        items: [
          "Classi piccole, piena autonomia didattica",
          "Trattati come soci fondatori, non dipendenti",
          "Aiuto all'alloggio in una delle zone più belle d'Italia",
        ],
      },
      {
        title: "Fasce d'età & lingue",
        items: [
          "Nido/Pre-primaria (3–5) · Primary (6–10) · Lower Secondary (11–14)",
          "Inglese + Italiano come lingue principali",
          "Francese, Tedesco, Spagnolo dalla primaria — Cinese e Russo opzionali",
        ],
      },
    ],
  },
  curriculum: {
    eyebrow: "Il nostro curricolo",
    title: "Cosa significa, in pratica",
    cards: [
      {
        kicker: "Pre-K e Primary",
        title: "Apprendimento per temi e indagine",
        body: "Il nostro approccio organizza l'apprendimento per unità tematiche (es. «Il nostro pianeta», «Civiltà antiche») che collegano scienze, storia, geografia, arte e lingua in un unico percorso, invece di materie isolate. Ogni unità sviluppa in parallelo conoscenze, abilità e un aspetto del carattere dello studente (es. resilienza, cooperazione, rispetto) — nello spirito dei migliori standard internazionali per l'infanzia e la primaria.",
      },
      {
        kicker: "Lower Secondary",
        title: "Apprendimento per concetti e contesti globali",
        body: "Per gli studenti di 11–14 anni, un approccio che favorisce l'apprendimento per concetti e per indagine, e collega le materie tra loro e al mondo reale attraverso progetti interdisciplinari — costruendo le basi per un percorso internazionale riconosciuto dalle università di tutto il mondo. Stiamo lavorando per ottenere, nel tempo, l'affiliazione formale con le organizzazioni educative internazionali di riferimento.",
      },
    ],
    more: "Scopri come funziona nel dettaglio",
    /* Le equivalenze riguardano il sistema scolastico italiano: nella versione
       inglese il materiale del cliente non le riporta. */
    equivalence: {
      eyebrow: "Equivalenze con il sistema italiano",
      title: "Pre-K e Grade 1–5: cosa significano",
      cards: [
        {
          title: "Pre-K (età 3–5)",
          body: "Corrisponde alla **Scuola dell'infanzia** italiana (materna). Non fa parte dell'obbligo scolastico: si può passare dal sistema italiano al nostro, e viceversa, in qualunque momento, senza alcuna formalità.",
        },
        {
          title: "Grade 1–5 (età 6–10/11)",
          body: "Corrisponde alla **Scuola primaria** italiana (1ª–5ª elementare). La nostra scuola sarà iscritta all'albo regionale come istituto non paritario, il che garantisce comunque l'assolvimento dell'obbligo scolastico. In questa fascia il rientro nel sistema italiano resta semplice: è previsto un solo esame di idoneità, sostenuto al termine della quinta elementare, per l'ammissione alla scuola secondaria di primo grado — la stessa procedura richiesta a chiunque provenga da una scuola non paritaria. Puntiamo a ottenere la parità scolastica anche per Grade 1–5 a partire da Settembre 2028 (vedi sotto).",
        },
      ],
      parity: {
        title: "Parità scolastica per tutta la scuola",
        body: "Puntiamo a ottenere la **parità scolastica** per l'intero istituto — Grade 1–5 inclusa — a partire da Settembre 2028, in coincidenza con l'apertura della Lower Secondary (Grade 6 in su, età 11+). Una volta ottenuta, la scuola potrà rilasciare titoli con piena validità legale per tutte le classi, senza necessità di esami esterni per il passaggio tra sistemi. *La parità è soggetta all'approvazione del MIUR: la data indicata è il nostro obiettivo, non una garanzia.*",
        note: "Fino a quel momento, per Grade 1–5 resta valida la procedura descritta sopra: un solo esame di idoneità al termine della quinta elementare.",
      },
    } as { eyebrow: string; title: string; cards: { title: string; body: string }[]; parity: { title: string; body: string; note: string } } | null,
  },
  access: {
    eyebrow: "Perché Colico",
    title: "Facile da raggiungere, nel cuore dell'Alto Lago",
    lead: "Colico è lo snodo dell'Alto Lago: qui arrivano la superstrada SS36 da Lecco, la ferrovia e le linee di battello del lago. Ecco quanto ci vuole dalle località vicine.",
    routes: [
      { town: "Lecco", ways: [{ mode: "In auto · SS36", minutes: 35 }, { mode: "In treno", minutes: 42 }] },
      { town: "Menaggio", ways: [{ mode: "In auto", minutes: 40 }, { mode: "In aliscafo", minutes: 30 }] },
      { town: "Chiavenna", ways: [{ mode: "In auto · SS36", minutes: 30 }, { mode: "In treno", minutes: 30 }] },
      { town: "Sondrio", ways: [{ mode: "In auto · SS38", minutes: 40 }, { mode: "In treno", minutes: 40 }] },
    ],
    note: "Tempi indicativi in condizioni di traffico regolare (la SS36 può rallentare nelle ore di punta) e secondo gli orari Trenord; il battello per Menaggio ha orari stagionali. Verifica sempre gli orari aggiornati prima di viaggiare.",
  },
  campus: {
    eyebrow: "La futura sede",
    title: "Semplice, calda, accogliente",
    lead: "Una prima immagine del progetto di ristrutturazione — spazi pensati per l'apprendimento all'aperto e in classi piccole.",
    hero: { caption: "La sede — vista d'insieme", alt: "Render dell'ingresso della scuola" },
    gallery: [
      { src: "/images/sede-aula.jpg", caption: "Interno aula", alt: "Render dell'interno di un'aula" },
      { src: "/images/sede-giochi.jpg", caption: "Area giochi", alt: "Render dell'area giochi" },
      { src: "/images/sede-esterno.jpg", caption: "Area didattica esterna", alt: "Render dell'area didattica all'aperto" },
    ],
    note: "* Render illustrativi della sede attuale, così come apparirà dopo la ristrutturazione.",
  },
  philosophy: {
    eyebrow: "Filosofia della scuola",
    title: "Alcune scelte non sono negoziabili",
    cards: [
      {
        tag: "Lettura",
        title: "Una pausa dedicata a leggere",
        body: "Una delle tre pause giornaliere è riservata alla lettura individuale e silenziosa, nella lingua scelta dal bambino — anche la lingua madre. Quei libri diventano poi la base per attività di condivisione e discussione in classe: raccontare, riassumere e discutere i libri davanti ai compagni. Un modo semplice per coltivare il piacere e l'abitudine di leggere, fin dai primi anni.",
        highlight: true,
      },
      {
        tag: "Comunicazione",
        title: "La comunicazione come competenza fondamentale",
        body: "Crediamo che comunicare con sicurezza sia importante quanto qualsiasi materia scolastica. Fin dai primi anni, i nostri studenti imparano a presentare le idee con chiarezza, a parlare con convinzione davanti agli altri e ad ascoltare attivamente — confrontandosi fino in fondo con punti di vista diversi prima di rispondere. Sono le competenze che trasformano la conoscenza in leadership, e fanno parte dell'apprendimento quotidiano al CIS, non sono lasciate al caso.",
        highlight: true,
      },
      {
        tag: "Compiti",
        title: "Niente compiti fino a 10 anni",
        body: "Le lezioni sono organizzate perché il lavoro si concluda in classe, durante l'orario scolastico regolare — non in dipendenza dai servizi opzionali del pomeriggio. Pomeriggi e sere restano liberi per la famiglia.",
        highlight: true,
      },
      {
        tag: "Zero schermi",
        title: "Un uso consapevole degli schermi",
        body: "A scuola, i dispositivi vengono utilizzati solo quando utili alla didattica — ad esempio per attività differenziate in matematica o per l'alfabetizzazione digitale strutturata. Incoraggiamo le famiglie a seguire alcune semplici regole di buon senso anche a casa, nello spirito della tendenza internazionale a proteggere i più giovani da un uso precoce o eccessivo dei social media.",
        highlight: false,
      },
      {
        tag: "Uniforme",
        title: "Elimina le differenze visibili",
        body: "Crea identità e appartenenza, semplifica le mattine, mette tutti sullo stesso piano.",
        highlight: false,
      },
      {
        tag: "Calendario",
        title: "~185 giorni, pause regolari",
        body: "Settembre–Giugno con pause regolari ogni 2 mesi: meno burnout, più equilibrio.",
        highlight: false,
      },
    ],
  },
  safety: {
    eyebrow: "Sicurezza e protezione",
    title: "Regole chiare, applicate sempre",
    lead: "Alcune politiche non sono negoziabili — perché la fiducia dei genitori si costruisce con pratiche verificabili, non con promesse.",
    cards: [
      {
        title: "Personale",
        items: [
          "Verifica penale internazionale e referenze obbligatorie per tutto il personale",
          "Safeguarding lead designato, punto di riferimento unico per ogni segnalazione",
          "Protocollo di tutela dei minori pubblicato e disponibile alle famiglie",
        ],
      },
      {
        title: "Spazi & vigilanza",
        items: [
          "Politica «mai soli»: nessun adulto resta mai da solo con un bambino",
          "Aule vetrate, sempre visibili",
          "Accesso dei genitori sempre aperto, senza preavviso",
        ],
      },
      {
        title: "Trasporto",
        items: [
          "Badge sullo scuolabus: un SMS avvisa i genitori quando il figlio sale e scende",
          "Incluso nella retta, nessun costo aggiuntivo",
          "L'autista segnala immediatamente ogni discesa a una fermata non prevista",
        ],
      },
      {
        title: "Dati personali",
        items: [
          "Dati di presenza e localizzazione trattati solo a fini di sicurezza",
          "Consenso esplicito dei genitori raccolto all'iscrizione, conforme al GDPR",
        ],
      },
    ],
  },
  fees: {
    eyebrow: "Costi",
    title: "Rette trasparenti, fin dall'inizio",
    lead: "Tre voci semplici da capire — nessuna sorpresa in corso d'anno.",
    labels: {
      nsaf: "NSAF",
      nsafNote: "una tantum, all'iscrizione",
      tuition: "Retta annuale",
      registration: "Iscrizione annuale",
      total: "Totale annuo ricorrente",
      totalNote: "escl. NSAF, mensa, bus",
    },
    tiers: [
      { name: "Pre-K", ages: "età 3–5", nsaf: 2000, tuition: 10500, registration: 1100 },
      { name: "Grade 1–5", ages: "età 6–10/11", nsaf: 2000, tuition: 15000, registration: 1100 },
    ],
    schedule: {
      title: "Piano di pagamento per l'anno scolastico 2027–2028",
      lead: "Cinque rate distribuite tra l'iscrizione e il primo anno scolastico.",
      head: { instalment: "Rata", due: "Scadenza" },
      rows: [
        { id: "P1", due: "Ott–Dic 2026", what: "NSAF + iscrizione", prek: 3100, grade: 3100 },
        { id: "P2", due: "Giugno 2027", what: "25% retta", prek: 2625, grade: 3750 },
        { id: "P3", due: "Ottobre 2027", what: "25% retta", prek: 2625, grade: 3750 },
        { id: "P4", due: "Dicembre 2027", what: "25% retta", prek: 2625, grade: 3750 },
        { id: "P5", due: "Marzo 2028", what: "25% retta", prek: 2625, grade: 3750 },
      ],
      total: "Totale (NSAF + iscrizione + retta)",
    },
    notes: [
      "* Materiale scolastico (libri, circa €750) addebitato a giugno insieme a P2. Mensa (circa €1.650/anno, opzionale) addebitata in 3 rate insieme a P3, P4 e P5. Bus (circa €1.200/anno, opzionale) fatturato separatamente.",
      "* NSAF: New Student Admission Fee, versata una sola volta al momento dell'iscrizione. Rette escluse mensa, bus e materiali.",
    ],
  },
  timeline: {
    eyebrow: "Il percorso",
    title: "Dalla validazione all'apertura",
    lead: "Un progetto reale, con tappe chiare — non un'idea sulla carta.",
    steps: [
      { when: "Ora → Settembre 2026", title: "Validazione & accordo municipale", body: "Sondaggio di 200+ famiglie, primi accordi con scuole e partner del territorio.", items: [] as string[], highlight: null as string | null },
      {
        when: "Settembre – Dicembre 2026",
        title: "La scuola prende forma",
        body: "",
        items: [
          "Il preside e il team fondatore si uniscono al progetto",
          "Percorso di riconoscimento ministeriale (MIUR) avviato",
          "Curricolo internazionale confermato",
        ],
        highlight: "Apertura delle iscrizioni",
      },
      { when: "Gennaio – Agosto 2027", title: "Pre-apertura", body: "Allestimento della sede, primi insegnanti, open day, attivazione del servizio bus, campagna di iscrizioni.", items: [], highlight: null },
      { when: "Settembre 2027", title: "Apertura — International Primary", body: "Accoglienza dei primi studenti, età 3–8, bus operativo, consiglio dei genitori attivo.", items: [], highlight: null },
      { when: "2028 – 2031", title: "Crescita verso piena capacità", body: "Apertura della Lower Secondary: la comunità scolastica cresce, i primi studenti della Primary proseguono il loro percorso, fino a 120 studenti.", items: [], highlight: null },
    ],
  },
  interest: {
    eyebrow: "Pre-registrazione",
    title: "Sii tra i primi a saperlo",
    lead: "La campagna ufficiale di pre-iscrizione parte in autunno 2026. Compila il modulo di registrazione per ricevere aggiornamenti in anteprima e un posto prioritario nella lista.",
    cta: "Vai al modulo di registrazione",
    note: "Qualche minuto — nessun impegno, è un primo passo, non un'iscrizione formale.",
  },
  footer: {
    place: "Colico, Lago di Como, Italia",
    contact: "Contatti",
    project: "Il progetto",
    links: [
      { href: "#accesso", label: "Come arrivare" },
      { href: "#percorso", label: "Percorso verso l'apertura" },
    ],
    curriculum: "Il curricolo nel dettaglio",
    motto: "Ex altis lux",
  },
  curriculumPage: {
    meta: {
      title: "Il nostro curricolo · CIS",
      description: "Il nostro approccio pedagogico per bambini dai 3 ai 14 anni: come funziona davvero.",
    },
    eyebrow: "Il nostro curricolo",
    title: "Il nostro approccio pedagogico:",
    titleEm: "come funziona davvero",
    lead: "Una guida completa al nostro metodo educativo per i vostri figli dai 3 ai 14 anni — cosa vivono gli studenti, cosa fanno gli insegnanti, e perché lo abbiamo scelto.",
    path: {
      kicker: "Il nostro percorso",
      title: "Verso il riconoscimento internazionale",
      paragraphs: [
        "I principali programmi educativi internazionali richiedono che le scuole seguano un percorso formale di accreditamento: la scuola presenta una candidatura, viene valutata da un ente indipendente, e riceve infine un riconoscimento ufficiale, valido per un periodo di tempo definito. È un processo serio, che richiede tempo — e che intendiamo intraprendere.",
        "Nel frattempo, diversi dei nostri insegnanti fondatori hanno esperienza diretta nell'insegnamento di curricoli internazionali accreditati, con certificazioni professionali ottenute in altre scuole dove hanno già applicato questi approcci. Il nostro obiettivo è portare questa stessa qualità e rigore alla scuola di Colico, e completare il nostro percorso di accreditamento non appena le condizioni saranno mature.",
      ],
    },
    primary: {
      kicker: "Pre-K e Primary · età 3–10",
      title: "Pre-K e Primary: apprendimento per temi e indagine",
      lead: "Il nostro approccio organizza l'apprendimento in unità tematiche che collegano più materie in un unico percorso, invece di insegnarle separatamente — un modello diffuso in molte scuole internazionali di eccellenza.",
      processTitle: "Come funziona: il processo in 5 fasi",
      steps: [
        { title: "Punto di partenza", body: "Un avvio coinvolgente e pratico" },
        { title: "Cosa sappiamo già", body: "Cosa sanno già i bambini" },
        { title: "Il tema", body: "Una panoramica di cosa si esplorerà" },
        { title: "Ricerca e riflessione", body: "Il cuore del lavoro" },
        { title: "Punto di arrivo", body: "I bambini mostrano il loro lavoro" },
      ],
      cards: [
        {
          title: "Principi generali",
          items: [
            "**Obiettivi disciplinari** — le competenze specifiche di ogni materia",
            "**Obiettivi personali** — otto qualità: adattabilità, comunicazione, collaborazione, empatia, etica, resilienza, rispetto, pensiero critico",
            "**Obiettivi internazionali** — comprendere culture diverse, mentalità globale",
          ],
          paragraphs: [] as string[],
        },
        {
          title: "Fondamenta pedagogiche",
          items: [
            "Apprendimento attivo — mani e mente coinvolte, non solo ascolto passivo",
            "Collegamento tra nuove conoscenze e quelle già possedute",
            "Metacognizione — riflettere su *come* si sta imparando, non solo su *cosa*",
          ],
          paragraphs: [],
        },
        {
          title: "Per gli studenti",
          items: [] as string[],
          paragraphs: [
            "L'apprendimento è vissuto come un'indagine coinvolgente, non come materie isolate. Le competenze sviluppate sono pensate per un mondo che cambia rapidamente — molti dei lavori di domani non esistono ancora oggi.",
            "La valutazione avviene per fasi di sviluppo (inizio → crescita → padronanza), con largo spazio all'autovalutazione per costruire motivazione e consapevolezza di sé.",
          ],
        },
        {
          title: "Per gli insegnanti",
          items: [],
          paragraphs: [
            "Una struttura chiara ma flessibile: piena libertà didattica su come realizzare ogni unità, adattandola ai propri studenti, mentre il framework garantisce coerenza negli obiettivi principali (matematica, inglese, scienze incluse).",
            "Pensato per integrarsi con altri programmi nazionali, non per sostituirli — motivo per cui si presta bene ad affiancare i requisiti del sistema italiano.",
          ],
        },
      ],
    },
    secondary: {
      kicker: "Lower Secondary · età 11–14",
      title: "Lower Secondary: apprendimento per concetti e contesti globali",
      lead: "Per gli studenti di 11–14 anni, un approccio costruito attorno a concetti chiave e contesti globali reali — le fondamenta per un futuro percorso internazionale riconosciuto. Stiamo lavorando per ottenere, nel tempo, l'affiliazione formale con le organizzazioni educative internazionali di riferimento.",
      cards: [
        {
          title: "Come funziona",
          items: [
            "**Più aree disciplinari integrate** — lingue, scienze umane e sociali, scienze, matematica, arti, educazione fisica e alla salute, design",
            "**Insegnamento per concetti** — ogni unità collega concetti chiave a contesti globali reali",
            "**Unità interdisciplinari** — almeno un progetto all'anno che unisce due o più materie",
          ],
          paragraphs: [] as string[],
          wide: false,
        },
        {
          title: "Per gli studenti",
          items: [] as string[],
          paragraphs: [
            "Gli studenti imparano a collegare ciò che studiano al mondo reale, sviluppando capacità di pensiero critico, ricerca e collaborazione che restano utili ben oltre la scuola.",
            "Il percorso costruisce le basi per un futuro diploma internazionale, riconosciuto dalle università di tutto il mondo.",
          ],
          wide: false,
        },
        {
          title: "Per gli insegnanti",
          items: [],
          paragraphs: [
            "Il framework non prescrive un curricolo rigido per materia: gli insegnanti costruiscono le unità di apprendimento pianificando insieme, collegando le materie tra loro e ai contesti globali. Questo richiede più collaborazione tra colleghi rispetto a un insegnamento tradizionale per materie isolate — ma dà anche più libertà creativa nel come si insegna.",
          ],
          wide: true,
        },
      ],
    },
    why: {
      title: "Perché questa combinazione",
      body: "Il nostro approccio per la Primaria e per la Lower Secondary condividono la stessa filosofia di fondo — apprendimento per indagine, obiettivi personali e internazionali accanto a quelli disciplinari — rendendo il passaggio dalla Primaria alla Lower Secondary naturale, non un cambio di sistema. È un modello utilizzato da scuole internazionali in tutto il mondo.",
    },
    after: {
      kicker: "Domanda frequente",
      title: "E dopo i 14 anni?",
      cards: [
        {
          title: "La nostra visione di crescita",
          body: "L'obiettivo a lungo termine è estendere il nostro percorso Lower Secondary fino ai 16 anni, e valutare l'introduzione di un percorso pre-universitario internazionale (16–18 anni), man mano che la scuola cresce insieme alle prime classi. Non è ancora un impegno definito nei tempi — dipenderà dalla crescita della scuola — ma è la direzione verso cui lavoriamo, insieme all'affiliazione formale con le organizzazioni educative internazionali di riferimento.",
        },
        {
          title: "Se la scuola non si sarà ancora estesa",
          body: "Il nostro approccio per la Lower Secondary è pensato per essere pienamente compatibile con i percorsi internazionali più diffusi: uno studente che completa i nostri primi 3 anni (11–14) può proseguire con serenità presso un'altra scuola internazionale, in Italia o all'estero. Non è un vicolo cieco — è un punto di partenza solido.",
        },
      ],
    },
    cta: "Registra il tuo interesse",
  },
};

export type Dict = typeof it;
