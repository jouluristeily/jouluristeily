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
          {siteSettings.heroDateLabel ? <p className="home-date">{siteSettings.heroDateLabel}</p> : null}
        </div>
      </section>

      {siteSettings.heroBlurb || homeBlock?.content ? (
        <div className="home-content">
          {siteSettings.heroBlurb ? <p className="home-blurb">{siteSettings.heroBlurb}</p> : null}
          <RichTextRenderer content={homeBlock?.content} />
        </div>
      ) : null}
    </div>
  )
}
