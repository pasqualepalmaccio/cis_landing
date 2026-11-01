# Landing V2 e nuova veste dell'Open Day

Data: 2026-11-01 · Classe: R2 (la pagina Open Day raccoglie le iscrizioni) · Commit: 7faf671, 4d8544c

## Cosa cambia

Revisione grafica della designer (handoff del 30/10), su landing e Open Day, in IT ed EN:
- sezioni alternate bianco, avorio e blu, con spaziatura unica;
- icone del marchio raccolte in un solo modulo;
- carosello con frecce e pallini, rette come schede;
- «Perché Colico» e il percorso animati, fermi con movimento ridotto;
- nuove CTA, H1 su due righe, prefisso CIS;
- metadati, hreflang e JSON-LD (`EducationalOrganization` e un `Event` per sessione).

## Cosa NON cambia (vincolo)

- Modulo d'iscrizione, API `/api/open-day` e lettura dell'evento dal CRM: nessuna riga toccata. Lo ha verificato il diff su `src/components/form`, `src/app/api`, `src/lib`.
- Date, turni e luogo arrivano solo dal CRM, mai dal testo.

## Testi della designer non portati

IEYC/IPC, condizioni Early Bird, «ingresso libero», i turni scritti a mano: sono promesse non validate dalla scuola. Il template email del CRM li contiene: vanno validati con la prova d'invio.

## Verifica dal vivo

- `/it`, `/en`, `/it/open-day`, `/en/open-day`, `/it/registrazione` e `/api/health` rispondono 200.
- Il modulo è presente, con i campi `session`, `email` e `phone`.
- I due `Event` sono presenti e i dati dell'evento vengono dal CRM.
- La filigrana «Ex altis lux» è assente.

## Rischi aperti

- **Canonical e hreflang** puntano a `SITE_URL` = cis-colico.com, che oggi risponde 404. Per ora non ha effetti, perché `landing.cis-colico.com` è `noindex` e `robots: Disallow`. Va riallineato quando il dominio definitivo andrà in linea.
- **«Pre-iscriviti ora» / «Assicurati un posto tra i primi»** suggeriscono un posto garantito, mentre la pre-registrazione non lo garantisce. Va validato dalla scuola.
