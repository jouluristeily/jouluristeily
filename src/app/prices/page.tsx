import { PriceTables } from '@/components/PriceTables'
import { RichTextRenderer } from '@/components/RichTextRenderer'
import { getContentBlockByKey, getPriceList, getSiteSettings } from '@/lib/site-data'

export const revalidate = 3600

export default async function PricesPage() {
  const [intro, priceList, siteSettings] = await Promise.all([
    getContentBlockByKey('pricelist'),
    getPriceList(),
    getSiteSettings(),
  ])

  return (
    <div className="prices-shell">
      {intro?.content ? (
        <div className="prices-intro">
          <RichTextRenderer content={intro.content} />
        </div>
      ) : null}

      <PriceTables eventYear={siteSettings.eventYear} items={priceList} />
    </div>
  )
}
