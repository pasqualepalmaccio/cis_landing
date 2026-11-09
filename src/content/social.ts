/* Profili social della scuola, mostrati nel piè di pagina. Un profilo senza
   indirizzo non compare: niente link vuoti o che portano alla home del social.
   Gli indirizzi li deve dare il committente (richiesta del 9/11/2026). */
export const SOCIAL: { name: "Instagram" | "Facebook" | "LinkedIn"; icon: "instagram" | "facebook" | "linkedin"; href: string }[] = [
  { name: "Instagram", icon: "instagram", href: "" },
  { name: "Facebook", icon: "facebook", href: "" },
  { name: "LinkedIn", icon: "linkedin", href: "" },
];
