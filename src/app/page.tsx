import { RichTextRenderer } from '@/components/RichTextRenderer'
import { getContentBlockByKey, getSiteSettings } from '@/lib/site-data'

export const revalidate = 3600

export default async function HomePage() {
  const [siteSettings, homeBlock] = await Promise.all([
    getSiteSettings(),
    getContentBlockByKey('homepage'),
  ])

  return (
    <div>
      <section className="home-hero">
        <div className="home-hero-inner">
          <h1 className="home-title">{siteSettings.siteName}</h1>
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
