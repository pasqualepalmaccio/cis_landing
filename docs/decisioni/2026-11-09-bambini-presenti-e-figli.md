# 2026-11-09 · Meet & Discover: bambini che vengono e figli per cui interessa la scuola

**Classe:** R3 (iscrizioni a un evento con posti limitati, dati di minori).
**Richiesta:** il committente segnala che nel modulo non è chiaro il senso di «Children».

## Il difetto

Un solo numero, `children`, faceva due cose: contava i posti all'incontro e decideva quante schede figlio compilare. Un genitore che viene da solo con due figli da iscrivere non poteva descriverli senza occupare due posti, e il CRM respingeva con 422 qualunque iscrizione con più figli descritti che bambini dichiarati.

## Cosa cambia

- **Modulo** (`src/components/form/open-day-form.tsx`): due campi. «Bambini che vengono all'incontro» (`children`, da 0, conta i posti) e «Figli per cui vi interessa la scuola» (da 0, parte da 1, decide le schede e quindi `childrenInfo`).
- **Inoltro** (`src/app/api/open-day/route.ts`): non respinge più `childrenInfo` più lungo di `children`. Resta il controllo sulle vecchie fasce d'età.
- **CRM** (`crm/src/lib/event-registration.ts`, commit 4fbe6b3): tolto lo stesso vincolo. Posti = adulti + `children`, invariato.
- Il contratto dei dati non cambia forma: stessi campi, cade solo un vincolo.

## Ordine di rilascio

Prima il CRM, poi la landing. Rovesciato, un CRM vecchio avrebbe respinto con 422 le iscrizioni di chi descrive figli che non vengono, e il tentativo sarebbe finito fra i «respinti». Il rilascio della landing parte solo dopo aver visto in esecuzione il container del CRM con il commit 4fbe6b3.

## Come ci si accorgerebbe se fosse sbagliato

Un 422 su `childrenInfo` dal CRM finisce nel registro dei tentativi della landing come «respinto». Dopo il rilascio: nessun tentativo respinto in coda `open-day`.

## Informativa

I figli descritti possono non partecipare all'incontro: l'informativa (`src/content/legal/it.ts`, `en.ts`) ora lo dice, e la versione passa al 2026-11-09 (`POLICY_UPDATED`, `OPEN_DAY_NOTICE_VERSION`). Le iscrizioni arrivate prima restano registrate con la versione 2026-11-05. La cancellazione dopo 12 mesi svuota già `childrenInfo`.
**Domanda aperta per il titolare (DPO):** la base art. 6.1.b copre anche i dati di figli che non partecipano, inseriti dal genitore per manifestare interesse alla scuola, o serve una finalità distinta?

## Esami dei revisori

- **Raggio d'azione:** nessun punto critico. Posti, email, purga e allarmi contano solo adulti + bambini presenti. Colonna CRM rinominata «Figli interessati» (cf3ac1b), perché quei figli non sono presenti.
- **Protezione dati:** l'informativa non copriva i figli assenti, ora corretta. Accettabile partire con una scheda di default.
- **Osservabilità e infrastruttura:** il CRM ha due risorse Coolify, web (valida) e worker. Prima del rilascio della landing il web girava già su 4fbe6b3 (verificato con `docker ps`), il worker no, ma la modifica non tocca lo schema.
  Rischi residui, non chiusi:
  - un 422 dal CRM finisce come `rejected` e **non viene ritentato** (`retryDue` riprende solo `received` e `failed`). Il recupero è manuale e non esiste uno script per farlo;
  - l'allarme orario `event_landing` è deduplicato: se ce n'è già uno aperto, i nuovi respinti non mandano email.

## Verifica dopo il rilascio

Sulla pagina live compaiono i due campi nuovi. Il conteggio dei `rejected` prima e dopo non è stato fatto: la lettura del database di produzione da questa sessione è stata negata. Va fatto dal pannello del CRM (allarmi e registro delle richieste).
