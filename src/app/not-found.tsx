import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="not-found-shell">
      <h1 className="not-found-title">Sivua ei löytynyt</h1>
      <p className="not-found-copy">
        Tämä reitti puuttuu vielä sisällöstä. Lisää uusi sivu CMS:ssä tai palaa takaisin
        etusivulle.
      </p>
      <Link href="/" className="btn-primary">
        Takaisin etusivulle
      </Link>
    </div>
  )
}
