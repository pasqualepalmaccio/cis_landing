/* I fatti dell'anno scolastico che valgono in entrambe le lingue: le classi con
   età, anno di nascita e stato all'apertura, e le date del calendario 2027/28.
   Stanno qui una volta sola; i dizionari it/en danno solo le parole intorno. */

export type YearStatus = "open" | "gradual" | "later";

/** Una riga per classe. `age` è l'età all'inizio dell'anno 2027/28: si è nati
 *  fra settembre di `age + 1` anni prima e agosto dell'anno dopo. */
export const YEAR_GROUPS: {
  stage: string;
  year: string;
  age: number;
  italy: { it: string; en: string };
  status: YearStatus;
}[] = [
  { stage: "EYFS", year: "Nursery", age: 3, italy: { it: "Infanzia, 1° anno", en: "Infanzia, 1st year" }, status: "open" },
  { stage: "EYFS", year: "Reception", age: 4, italy: { it: "Infanzia, 2° anno", en: "Infanzia, 2nd year" }, status: "open" },
  { stage: "KS1", year: "Year 1", age: 5, italy: { it: "Infanzia, 3° anno", en: "Infanzia, 3rd year" }, status: "open" },
  { stage: "KS1", year: "Year 2", age: 6, italy: { it: "1ª primaria", en: "Primaria, 1st year" }, status: "open" },
  { stage: "KS2", year: "Year 3", age: 7, italy: { it: "2ª primaria", en: "Primaria, 2nd year" }, status: "open" },
  { stage: "KS2", year: "Year 4", age: 8, italy: { it: "3ª primaria", en: "Primaria, 3rd year" }, status: "gradual" },
  { stage: "KS2", year: "Year 5", age: 9, italy: { it: "4ª primaria", en: "Primaria, 4th year" }, status: "gradual" },
  { stage: "KS2", year: "Year 6", age: 10, italy: { it: "5ª primaria", en: "Primaria, 5th year" }, status: "gradual" },
  { stage: "KS3", year: "Year 7", age: 11, italy: { it: "1ª media", en: "Media, 1st year" }, status: "later" },
  { stage: "KS3", year: "Year 8", age: 12, italy: { it: "2ª media", en: "Media, 2nd year" }, status: "later" },
  { stage: "KS3", year: "Year 9", age: 13, italy: { it: "3ª media", en: "Media, 3rd year" }, status: "later" },
];

/** Anno solare in cui comincia l'anno scolastico della tabella. */
export const SCHOOL_YEAR_START = 2027;

export type BreakKey = "autumn" | "christmas" | "carnival" | "spring";

/** Calendario 2027/28. Per ogni pausa: ultimo giorno di scuola e giorno del
 *  rientro; i giorni di pausa e la posizione sulla barra si calcolano. */
export const CALENDAR = {
  first: "2027-09-01",
  last: "2028-06-14",
  breaks: [
    { key: "autumn", last: "2027-10-22", back: "2027-11-02" },
    { key: "christmas", last: "2027-12-22", back: "2028-01-07" },
    { key: "carnival", last: "2028-02-25", back: "2028-03-06" },
    { key: "spring", last: "2028-04-21", back: "2028-05-02" },
  ] as { key: BreakKey; last: string; back: string }[],
};
