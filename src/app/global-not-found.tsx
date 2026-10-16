import Link from "next/link";

import "./globals.css";

export default function GlobalNotFound() {
  return (
    <html lang="it">
      <body className="grid min-h-svh place-items-center bg-navy-900 p-8 text-center font-sans text-cream">
        <div>
          <p className="font-display text-7xl text-gold-300">404</p>
          <p className="mt-4 text-mist">Pagina non trovata · Page not found</p>
          <Link href="/it" className="mt-8 inline-flex rounded-full bg-gold-500 px-6 py-3 font-bold text-navy-900">
            Colico International School →
          </Link>
        </div>
      </body>
    </html>
  );
}
