/* Testi della landing in italiano. È la forma di riferimento: la versione
   inglese deve avere esattamente le stesse chiavi (lo controlla il tipo Dict).
   Nei testi, **parola** è grassetto e *parola* è corsivo. */

export const it = {
  meta: {
    title: "CIS · Colico International School",
    description:
      "Una nuova scuola internazionale sul Lago di Como, a Colico. Apre a settembre 2027. Lascia il tuo interesse e ti avvisiamo quando si aprono le pre-iscrizioni.",
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
    eyebrow: "La nuova scuola internazionale dell'Alto Lago · Apertura settembre 2027",
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
  vision: {
    eyebrow: "La nostra visione",
    title: "Quello che resta, dopo la scuola",
    lead: "L'abbiamo pensata per bambini, genitori e insegnanti. L'idea è semplice: crescere ragazzi che sanno pensare e sanno fare.",
    cards: [
      {
        title: "Per i bambini",
        items: [
          "Ambiente multilingue e multiculturale, fin dal Pre-K",
          "Si impara anche all'aperto, come parte delle lezioni",
          "Orto, falegnameria e cucina in classe",
        ],
      },
      {
        title: "Per i genitori",
        items: [
          "Orario esteso fino alle 18:30 con sport e laboratori *(facoltativo, a pagamento)*",
          "Giornate «Un genitore in classe»: passate una mattina a scuola con vostro figlio",
          "Navette dedicate su tutto l'Alto Lago",
        ],
      },
      {
        title: "Per gli insegnanti",
        items: [
          "Classi piccole, piena autonomia didattica",
          "Entrano come soci fondatori del progetto",
          "Un aiuto per trovare casa sul lago",
        ],
      },
      {
        title: "Fasce d'età e lingue",
        items: [
          "Nido/Pre-primaria (3–5) · Primary (6–10) · Lower Secondary (11–14)",
          "Inglese e italiano come lingue principali",
          "Francese, tedesco e spagnolo dalla primaria. Cinese e russo facoltativi",
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
        body: "Il nostro approccio organizza l'apprendimento per unità tematiche (es. «Il nostro pianeta», «Civiltà antiche») che collegano scienze, storia, geografia, arte e lingua in un unico percorso, invece di tenerle separate. Ogni unità lavora insieme su conoscenze, abilità e un tratto del carattere, come la resilienza, la cooperazione o il rispetto.",
      },
      {
        kicker: "Lower Secondary",
        title: "Apprendimento per concetti e contesti globali",
        body: "Dagli 11 ai 14 anni si impara per concetti e per indagine. I progetti mettono insieme più materie e le collegano a problemi veri. È la base per un percorso internazionale che le università di tutto il mondo riconoscono. Stiamo lavorando per ottenere, nel tempo, l'affiliazione formale con le organizzazioni educative internazionali di riferimento.",
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
          body: "Corrisponde alla **Scuola primaria** italiana (1ª–5ª elementare). La nostra scuola sarà iscritta all'albo regionale come istituto non paritario, il che garantisce comunque l'assolvimento dell'obbligo scolastico. In questa fascia il rientro nel sistema italiano resta semplice: è previsto un solo esame di idoneità, sostenuto al termine della quinta elementare, per l'ammissione alla scuola secondaria di primo grado. È la stessa procedura prevista per chiunque arrivi da una scuola non paritaria. Puntiamo alla parità scolastica anche per Grade 1–5 da settembre 2028 (vedi sotto).",
        },
      ],
      parity: {
        title: "Parità scolastica per tutta la scuola",
        body: "Puntiamo alla **parità scolastica** per tutto l'istituto, Grade 1–5 compresa, da settembre 2028, quando apre la Lower Secondary (dal Grade 6, età 11+). Una volta ottenuta, la scuola potrà rilasciare titoli con piena validità legale per tutte le classi, senza necessità di esami esterni per il passaggio tra sistemi. *La parità è soggetta all'approvazione del MIUR: la data indicata è il nostro obiettivo, non una garanzia.*",
        note: "Fino a quel momento, per Grade 1–5 resta valida la procedura descritta sopra: un solo esame di idoneità al termine della quinta elementare.",
      },
    } as { eyebrow: string; title: string; cards: { title: string; body: string }[]; parity: { title: string; body: string; note: string } } | null,
  },
  access: {
    eyebrow: "Perché Colico",
    title: "Colico si raggiunge facilmente",
    lead: "Colico è lo snodo dell'Alto Lago: qui arrivano la superstrada SS36 da Lecco, la ferrovia e le linee di battello del lago. Questi sono i tempi dalle località vicine.",
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
    lead: "Una prima immagine della ristrutturazione: spazi per classi piccole e per le lezioni all'aperto.",
    hero: { caption: "La sede, vista d'insieme", alt: "Render dell'ingresso della scuola" },
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
        body: "Una delle tre pause giornaliere è riservata alla lettura individuale e silenziosa, nella lingua che il bambino sceglie, anche la sua lingua madre. Poi in classe quei libri si raccontano, si riassumono e se ne discute con i compagni. Così leggere diventa un'abitudine, e spesso un piacere, già dai primi anni.",
        highlight: true,
      },
      {
        tag: "Comunicazione",
        title: "Saper parlare e saper ascoltare",
        body: "Per noi comunicare con sicurezza conta quanto una materia. Dai primi anni i bambini imparano a spiegare un'idea con chiarezza, a parlare davanti agli altri e ad ascoltare davvero chi la pensa diversamente prima di rispondere. Al CIS si allena ogni giorno, in classe.",
        highlight: true,
      },
      {
        tag: "Compiti",
        title: "Niente compiti fino a 10 anni",
        body: "Il lavoro si finisce in classe, durante l'orario normale, senza contare sui servizi facoltativi del pomeriggio. Pomeriggi e sere restano alla famiglia.",
        highlight: true,
      },
      {
        tag: "Zero schermi",
        title: "Un uso consapevole degli schermi",
        body: "A scuola i dispositivi si usano solo quando servono alla lezione, per esempio per esercizi differenziati di matematica o per imparare a usare il digitale con metodo. Alle famiglie proponiamo poche regole di buon senso anche a casa, soprattutto per tenere i più piccoli lontani dai social.",
        highlight: false,
      },
      {
        tag: "Uniforme",
        title: "Tutti uguali, almeno nei vestiti",
        body: "Ci si sente parte della stessa scuola e la mattina si fa prima.",
        highlight: false,
      },
      {
        tag: "Calendario",
        title: "~185 giorni, pause regolari",
        body: "Da settembre a giugno, con una pausa ogni due mesi circa per non arrivare stremati.",
        highlight: false,
      },
    ],
  },
  safety: {
    eyebrow: "Sicurezza e protezione",
    title: "Regole chiare, applicate sempre",
    lead: "Su alcune regole non si tratta. Un genitore deve poterle verificare, non solo leggerle.",
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
        title: "Spazi e vigilanza",
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
    title: "Le rette, tutte e subito",
    lead: "Tre voci, e durante l'anno non se ne aggiungono altre.",
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
      title: "Piano di pagamento per l'anno scolastico 2027/28",
      lead: "Cinque rate, dall'iscrizione alla fine del primo anno.",
      head: { instalment: "Rata", due: "Scadenza" },
      rows: [
        { id: "P1", due: "Ott-dic 2026", what: "NSAF + iscrizione", prek: 3100, grade: 3100 },
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
    lead: "Le tappe, con le date che abbiamo oggi.",
    steps: [
      { when: "Fino a settembre 2026", title: "Verifica e accordo con il Comune", body: "Un sondaggio con oltre 200 famiglie e i primi accordi con scuole e partner della zona.", items: [] as string[], highlight: null as string | null },
      {
        when: "Settembre-dicembre 2026",
        title: "La scuola prende forma",
        body: "",
        items: [
          "Il preside e il team fondatore si uniscono al progetto",
          "Avviato il riconoscimento ministeriale (MIUR)",
          "Curricolo internazionale confermato",
        ],
        highlight: "Apertura delle iscrizioni",
      },
      { when: "Gennaio-agosto 2027", title: "Pre-apertura", body: "Allestimento della sede, primi insegnanti, open day, attivazione del servizio bus, campagna di iscrizioni.", items: [], highlight: null },
      { when: "Settembre 2027", title: "Apre la International Primary", body: "Arrivano i primi studenti, dai 3 agli 8 anni. Il bus è in servizio e il consiglio dei genitori è attivo.", items: [], highlight: null },
      { when: "2028-2031", title: "La scuola cresce", body: "Apre la Lower Secondary. I primi bambini della Primary continuano qui, e la scuola arriva a 120 studenti.", items: [], highlight: null },
    ],
  },
  interest: {
    eyebrow: "Pre-registrazione",
    title: "Vuoi saperlo per primo?",
    lead: "Le pre-iscrizioni aprono in autunno 2026. Compila il modulo: ti scriviamo prima degli altri e hai la precedenza in lista.",
    cta: "Vai al modulo di registrazione",
    note: "Bastano pochi minuti e non ti impegna a nulla. Non è un'iscrizione.",
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
      description: "Come insegniamo ai bambini dai 3 ai 14 anni, spiegato per bene.",
    },
    eyebrow: "Il nostro curricolo",
    title: "Il nostro approccio pedagogico:",
    titleEm: "come funziona davvero",
    lead: "Cosa fanno i vostri figli in classe dai 3 ai 14 anni, cosa fanno gli insegnanti e perché abbiamo scelto questo metodo.",
    path: {
      kicker: "Il nostro percorso",
      title: "Verso il riconoscimento internazionale",
      paragraphs: [
        "I principali programmi educativi internazionali richiedono che le scuole seguano un percorso formale di accreditamento: la scuola presenta una candidatura, viene valutata da un ente indipendente, e alla fine ottiene un riconoscimento ufficiale che dura un certo numero di anni. Ci vuole tempo, e lo faremo.",
        "Intanto, diversi insegnanti fondatori hanno già insegnato curricoli internazionali accreditati in altre scuole, con le relative certificazioni. Vogliamo portare lo stesso livello a Colico e chiedere l'accreditamento appena la scuola sarà pronta.",
      ],
    },
    primary: {
      kicker: "Pre-K e Primary · età 3–10",
      title: "Pre-K e Primary: apprendimento per temi e indagine",
      lead: "Il nostro approccio organizza l'apprendimento in unità tematiche che collegano più materie in un unico percorso, invece di insegnarle una per una. Lo fanno molte scuole internazionali.",
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
            "**Obiettivi disciplinari:** le competenze di ogni materia",
            "**Obiettivi personali:** otto qualità, cioè adattabilità, comunicazione, collaborazione, empatia, etica, resilienza, rispetto e pensiero critico",
            "**Obiettivi internazionali:** capire culture diverse dalla propria",
          ],
          paragraphs: [] as string[],
        },
        {
          title: "Fondamenta pedagogiche",
          items: [
            "I bambini fanno, non stanno solo ad ascoltare",
            "Collegamento tra nuove conoscenze e quelle già possedute",
            "Si riflette anche su *come* si impara (metacognizione)",
          ],
          paragraphs: [],
        },
        {
          title: "Per gli studenti",
          items: [] as string[],
          paragraphs: [
            "Per i bambini imparare diventa un'indagine. Le competenze servono in un mondo che cambia in fretta, dove molti dei lavori di domani ancora non esistono.",
            "La valutazione segue tre fasi (inizio, crescita, padronanza) e lascia molto spazio all'autovalutazione, che aiuta i ragazzi a conoscersi e a motivarsi.",
          ],
        },
        {
          title: "Per gli insegnanti",
          items: [],
          paragraphs: [
            "Gli insegnanti decidono come svolgere ogni unità e la adattano alla classe. Il framework tiene fermi gli obiettivi principali, compresi matematica, inglese e scienze.",
            "Il metodo si affianca ai programmi nazionali senza sostituirli, quindi convive bene con i requisiti italiani.",
          ],
        },
      ],
    },
    secondary: {
      kicker: "Lower Secondary · età 11–14",
      title: "Lower Secondary: apprendimento per concetti e contesti globali",
      lead: "Dagli 11 ai 14 anni le lezioni partono da concetti chiave e da situazioni reali nel mondo. È la base per un percorso internazionale riconosciuto. Stiamo lavorando per ottenere, nel tempo, l'affiliazione formale con le organizzazioni educative internazionali di riferimento.",
      cards: [
        {
          title: "Come funziona",
          items: [
            "**Aree disciplinari collegate:** lingue, scienze umane e sociali, scienze, matematica, arti, educazione fisica e alla salute, design",
            "**Per concetti:** ogni unità lega un concetto a un caso reale",
            "**Interdisciplinare:** almeno un progetto all'anno che unisce due o più materie",
          ],
          paragraphs: [] as string[],
          wide: false,
        },
        {
          title: "Per gli studenti",
          items: [] as string[],
          paragraphs: [
            "I ragazzi imparano a collegare quello che studiano a quello che succede fuori. Imparano a ragionare, a fare ricerca e a lavorare in gruppo, e se lo portano dietro anche dopo.",
            "È la preparazione a un diploma internazionale che le università di tutto il mondo riconoscono.",
          ],
          wide: false,
        },
        {
          title: "Per gli insegnanti",
          items: [],
          paragraphs: [
            "Il framework non prescrive un curricolo rigido per materia: gli insegnanti costruiscono le unità di apprendimento pianificando insieme, collegando le materie tra loro e ai contesti globali. Serve più lavoro di squadra tra colleghi rispetto all'insegnamento per materie separate, ma c'è anche più libertà su come insegnare.",
          ],
          wide: true,
        },
      ],
    },
    why: {
      title: "Perché questa combinazione",
      body: "Primaria e Lower Secondary seguono la stessa idea: si impara per indagine, e accanto agli obiettivi di materia ci sono quelli personali e internazionali. Per questo il passaggio dall'una all'altra viene naturale. Molte scuole internazionali lavorano così.",
    },
    after: {
      kicker: "Domanda frequente",
      title: "E dopo i 14 anni?",
      cards: [
        {
          title: "La nostra visione di crescita",
          body: "Più avanti vorremmo portare la Lower Secondary fino ai 16 anni e valutare un percorso pre-universitario internazionale (16–18 anni), man mano che crescono le prime classi. Non abbiamo ancora date: dipende da come cresce la scuola. È comunque la direzione, insieme all'affiliazione con le organizzazioni educative internazionali.",
        },
        {
          title: "Se la scuola non si sarà ancora estesa",
          body: "Il nostro approccio per la Lower Secondary è pensato per essere pienamente compatibile con i percorsi internazionali più diffusi: chi finisce da noi i tre anni dagli 11 ai 14 può continuare senza problemi in un'altra scuola internazionale, in Italia o all'estero.",
        },
      ],
    },
    cta: "Registra il tuo interesse",
  },
};

export type Dict = typeof it;
