import { getSiteSettings } from '@/lib/site-data'

export const revalidate = 3600

export default async function GalleryPage() {
  const siteSettings = await getSiteSettings()

  if (!siteSettings.galleryUrl) {
    return null
  }

  return (
    <div className="gallery-page">
      <iframe
        src={siteSettings.galleryUrl}
        className="gallery-iframe"
        loading="lazy"
        allowFullScreen
        title="Jouluristeily gallery"
      />
    </div>
  )
}
