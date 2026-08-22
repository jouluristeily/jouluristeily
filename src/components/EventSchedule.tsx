import type { EventData } from '@/lib/site-data'

const formatTimeRange = (startAt: string, endAt: string) => {
  const start = new Date(startAt)
  const end = new Date(endAt)

  return `${start.getHours()}:${start.getMinutes().toString().padStart(2, '0')} - ${end.getHours()}:${end
    .getMinutes()
    .toString()
    .padStart(2, '0')}`
}

const formatDayAbbreviation = (value: string) =>
  new Date(value).toLocaleDateString('fi-FI', {
    weekday: 'short',
  })

export function EventSchedule({ events }: { events: EventData[] }) {
  if (!events.length) {
    return null
  }

  const now = Date.now()
  const nowEvents = events.filter((event) => {
    const start = new Date(event.startAt).getTime()
    const end = new Date(event.endAt).getTime()

    return start <= now && end >= now
  })
  const upcomingEvents = events.filter((event) => new Date(event.startAt).getTime() > now)
  const sections = [
    { title: 'Now', events: nowEvents },
    { title: 'Upcoming', events: upcomingEvents },
  ].filter((section) => section.events.length > 0)

  if (!sections.length) {
    return null
  }

  return (
    <div className="event-sections">
      {sections.map((section) => (
        <section key={section.title} className="event-section">
          <h1 className="event-section-title">{section.title}</h1>
          <div className="event-section-list">
            {section.events.map((event) => {
              const start = new Date(event.startAt)

              return (
                <article key={`${event.title}-${event.startAt}`} className="event-card">
                  <div className="event-card-time">
                    <span className="event-card-hour">{start.getHours()}</span>
                    <span className="event-card-day">{formatDayAbbreviation(event.startAt)}</span>
                  </div>
                  <div className="event-card-content">
                    <h2 className="event-card-title">
                      {event.title}
                      {event.location ? ` @ ${event.location}` : ''}
                    </h2>
                    <p className="event-card-meta">{formatTimeRange(event.startAt, event.endAt)}</p>
                    <div className="event-card-description">
                      <p>{event.description}</p>
                      {event.location ? <p className="event-card-location">{event.location}</p> : null}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
