import type { LinkItem } from '@/lib/site-data'

const programmeDescription = (label: string) =>
  label.toLocaleLowerCase('fi-FI').includes('tuplis')
    ? 'Tupliksen aikataulut ja ohjelmatiedot yhdessä käsiohjelmassa.'
    : 'Jouluristeilyn aikataulut, ohjelmanumerot ja käytännön tiedot yhdessä käsiohjelmassa.'

export function ProgramDownloads({ downloads }: { downloads: LinkItem[] }) {
  return (
    <section className="programme-downloads" aria-labelledby="programme-heading">
      <header className="programme-heading">
        <p className="programme-eyebrow">Jouluristeily 2025</p>
        <h1 id="programme-heading">Ohjelma</h1>
        <p>Valitse oma käsiohjelmasi. PDF toimii myös ilman jatkuvaa verkkoyhteyttä, kun avaat sen kerran laitteellasi.</p>
      </header>

      <div className="programme-card-grid">
        {downloads.map((download) => (
          <article key={`${download.label}-${download.url}`} className="programme-card">
            <span className="programme-card-file" aria-hidden="true">PDF</span>
            <h2>{download.label}</h2>
            <p>{programmeDescription(download.label)}</p>
            <a href={download.url} className="programme-card-link" target="_blank" rel="noreferrer">
              Avaa käsiohjelma
            </a>
          </article>
        ))}
      </div>
    </section>
  )
}
