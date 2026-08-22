import { EventSchedule } from '@/components/EventSchedule'
import { ProgramDownloads } from '@/components/ProgramDownloads'
import { getEvents, getSiteSettings } from '@/lib/site-data'

export const revalidate = 3600

export default async function EventsPage() {
  const [siteSettings, events] = await Promise.all([getSiteSettings(), getEvents()])

  return (
    <div className="programme-page">
      {siteSettings.programDownloads?.length ? (
        <ProgramDownloads downloads={siteSettings.programDownloads} />
      ) : null}
      {events.length ? <EventSchedule events={events} /> : null}
    </div>
  )
}
