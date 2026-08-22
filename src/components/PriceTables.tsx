import type { PriceData } from '@/lib/site-data'

const sections: Array<{
  key: PriceData['type']
  title: string
}> = [
  { key: 'jr_hytti', title: 'Jouluristeilyn hyttihinnasto 2025' },
  { key: 'tp_hytti', title: 'TUPLIS hyttihinnasto' },
  { key: 'appro', title: 'Ankkuri-Appro / henkilö' },
  { key: 'ruokailu', title: 'Ruokailut' },
  { key: 'tp_ruokailu', title: 'Tuplis Ruokailut' },
]

export function PriceTables({ items }: { items: PriceData[] }) {
  if (!items.length) {
    return null
  }

  return (
    <div className="prices-groups">
      {sections.map((section) => {
        const rows = items
          .filter((item) => item.type === section.key)
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0) || a.title.localeCompare(b.title))

        if (!rows.length) {
          return null
        }

        return (
          <section key={section.key} className="price-sub-list">
            <h2 className="price-sub-list-title">{section.title}</h2>
            <div className="price-list-rows">
              {rows.map((item) => (
                <article key={`${item.type}-${item.title}`} className="price-item-row">
                  <div className="price-item-title-column">
                    <h3 className="price-item-title">{item.title}</h3>
                  </div>
                  <div className="price-item-value-column">
                    <h3 className="price-item-value">{item.price} €</h3>
                  </div>
                  <div className="price-item-description-column">
                    {item.description ? <p className="price-item-description">{item.description}</p> : null}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
