import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found-shell">
      <h1 className="not-found-title">404 – Sivua ei löytynyt</h1>
      <p className="not-found-copy">
        Valitettavasti hakemasi sivu ei näytä olevan saatavissa. Sivu on
        saattanut siirtyä, poistua tai se ei koskaan ole ollut olemassa.
      </p>
      <p className="not-found-copy">
        Voit palata etusivulle tai tutustua aikatauluun ja ohjelmaan navigaation
        avulla.
      </p>
      <div className="not-found-actions">
        <Link href="/" className="btn-primary">
          Takaisin etusivulle
        </Link>
        <Link href="/events" className="btn-secondary">
          Näytä tapahtumat
        </Link>
      </div>
    </div>
  );
}
