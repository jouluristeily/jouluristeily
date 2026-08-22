import { EventSchedule } from '@/components/EventSchedule'
import { getEvents, getSiteSettings } from '@/lib/site-data'

export const revalidate = 60 * 60

export default async function EventsPage() {
  const [siteSettings, events] = await Promise.all([getSiteSettings(), getEvents()])

  if (siteSettings.programDownloads?.length) {
    return (
      <div className="events-download-shell">
        {siteSettings.programDownloads.map((link) => (
          <div key={`${link.label}-${link.url}`} className="events-download-item">
            <a href={link.url} className="btn-primary" target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <EventSchedule events={events} />
    </div>
  )
}
