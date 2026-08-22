import { PriceTables } from '@/components/PriceTables'
import { RichTextRenderer } from '@/components/RichTextRenderer'
import { getContentBlockByKey, getPriceList } from '@/lib/site-data'

export const revalidate = 60 * 60

export default async function PricesPage() {
  const [intro, priceList] = await Promise.all([getContentBlockByKey('pricelist'), getPriceList()])

  return (
    <div className="prices-shell">
      {intro?.content ? (
        <div className="prices-intro">
          <RichTextRenderer content={intro.content} />
        </div>
      ) : null}

      <PriceTables items={priceList} />
    </div>
  )
}
