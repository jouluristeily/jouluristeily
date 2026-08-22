import { EventSchedule } from '@/components/EventSchedule'
import { ProgramDownloads } from '@/components/ProgramDownloads'
import { getEvents, getSiteSettings } from '@/lib/site-data'

export const revalidate = 3600

export default async function EventsPage() {
  const [siteSettings, events] = await Promise.all([getSiteSettings(), getEvents()])

  return (
    <div className="programme-page">
      {siteSettings.programDownloads?.length ? (
        <ProgramDownloads
          dateLabel={siteSettings.heroDateLabel}
          downloads={siteSettings.programDownloads}
          siteName={siteSettings.siteName}
        />
      ) : null}
      {events.length ? <EventSchedule events={events} /> : null}
    </div>
  )
}
