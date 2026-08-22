import { RichTextRenderer } from '@/components/RichTextRenderer'
import { getContentBlockByKey, getSiteSettings } from '@/lib/site-data'

export const revalidate = 60 * 60

export default async function HomePage() {
  const [siteSettings, homeBlock] = await Promise.all([
    getSiteSettings(),
    getContentBlockByKey('homepage'),
  ])

  return (
    <div>
      <section className="home-hero">
        <div className="home-hero-inner">
          <img src="/logo.svg" alt={siteSettings.siteName} className="home-logo" />
          <h3 className="home-date">{siteSettings.heroDateLabel}</h3>
        </div>
      </section>

      {homeBlock?.content ? (
        <div className="home-content">
          <RichTextRenderer content={homeBlock.content} />
        </div>
      ) : null}
    </div>
  )
}
