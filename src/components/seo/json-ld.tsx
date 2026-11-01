/* Dati strutturati schema.org nella pagina, come raccomanda la guida di
   Next (docs/01-app/02-guides/json-ld.md). «<» diventa < perché un
   testo che arriva da fuori (il CRM) non possa chiudere il tag. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
