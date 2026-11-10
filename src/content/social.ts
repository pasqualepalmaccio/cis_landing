/* Profili social della scuola, mostrati nel piè di pagina. Un profilo senza
   indirizzo non compare: niente link vuoti o che portano alla home del social.
   Indirizzi dati dal committente il 10/11/2026, senza parametri di tracciamento. */
export const SOCIAL: { name: "Instagram" | "Facebook" | "LinkedIn"; icon: "instagram" | "facebook" | "linkedin"; href: string }[] = [
  { name: "Instagram", icon: "instagram", href: "https://www.instagram.com/colico.international.school/" },
  { name: "Facebook", icon: "facebook", href: "https://www.facebook.com/colico.international.school/" },
  { name: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/colico-international-school/" },
];
