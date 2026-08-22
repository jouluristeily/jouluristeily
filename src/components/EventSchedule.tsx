'use client'

import { useEffect, useState } from 'react'

import type { EventData } from '@/lib/site-data'

const eventTimeZone = 'Europe/Helsinki'

const formatTimeRange = (startAt: string, endAt: string) => {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: eventTimeZone,
  }

  return `${new Intl.DateTimeFormat('fi-FI', timeOptions).format(new Date(startAt))} - ${new Intl.DateTimeFormat(
    'fi-FI',
    timeOptions,
  ).format(new Date(endAt))}`
}

const formatDate = (value: string) =>
  new Intl.DateTimeFormat('fi-FI', {
    day: 'numeric',
    month: 'numeric',
    weekday: 'short',
    timeZone: eventTimeZone,
  }).format(new Date(value))

const formatHour = (value: string) =>
  new Intl.DateTimeFormat('fi-FI', {
    hour: '2-digit',
    hour12: false,
    timeZone: eventTimeZone,
  }).format(new Date(value))

const formatDayAbbreviation = (value: string) =>
  new Intl.DateTimeFormat('fi-FI', {
    weekday: 'short',
    timeZone: eventTimeZone,
  }).format(new Date(value))

const eventYear = (event: EventData) =>
  Number(
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      timeZone: eventTimeZone,
    }).format(new Date(event.startAt)),
  )

type ScheduleSection = {
  title: string
  events: EventData[]
}

export function EventSchedule({ events }: { events: EventData[] }) {
  const scheduledEvents = events.filter((event) => Boolean(event.programme))
  const years = [...new Set(scheduledEvents.map(eventYear))].sort((a, b) => b - a)
  const [selectedYear, setSelectedYear] = useState(years[0])
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 60_000)
    return () => window.clearInterval(interval)
  }, [])

  if (!years.length || selectedYear === undefined) {
    return null
  }

  const selectedEvents = scheduledEvents
    .filter((event) => eventYear(event) === selectedYear)
    .sort((left, right) => new Date(left.startAt).getTime() - new Date(right.startAt).getTime())

  const sections: ScheduleSection[] = [
    {
      title: 'Käynnissä',
      events: selectedEvents.filter((event) => {
        const start = new Date(event.startAt).getTime()
        const end = new Date(event.endAt).getTime()
        return start <= now && end >= now
      }),
    },
    {
      title: 'Tulossa',
      events: selectedEvents.filter((event) => new Date(event.startAt).getTime() > now),
    },
    {
      title: 'Menneet',
      events: selectedEvents.filter((event) => new Date(event.endAt).getTime() < now),
    },
  ].filter((section) => section.events.length)

  return (
    <section className="event-schedule" aria-labelledby="event-schedule-heading">
      <div className="event-schedule-heading">
        <div>
          <p className="programme-eyebrow">Aikataulu</p>
          <h2 id="event-schedule-heading">Tapahtumat</h2>
        </div>
        <label className="event-year-select">
          <span>Vuosi</span>
          <select value={selectedYear} onChange={(event) => setSelectedYear(Number(event.target.value))}>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      </div>

      {sections.map((section) => (
        <section key={section.title} className="event-section">
          <h3 className="event-section-title">{section.title}</h3>
          <div className="event-section-list">
            {section.events.map((event) => (
              <article key={`${event.title}-${event.startAt}`} className="event-card">
                <div className="event-card-time">
                  <span className="event-card-hour">{formatHour(event.startAt)}</span>
                  <span className="event-card-day">{formatDayAbbreviation(event.startAt)}</span>
                </div>
                <div className="event-card-content">
                  <div className="event-card-title-row">
                    <h4 className="event-card-title">{event.title}</h4>
                    {event.programme ? (
                      <span className="event-card-programme">
                        {event.programme === 'tuplis' ? 'Tuplis' : 'JR'}
                      </span>
                    ) : null}
                  </div>
                  <p className="event-card-meta">
                    {formatDate(event.startAt)} klo {formatTimeRange(event.startAt, event.endAt)}
                  </p>
                  <div className="event-card-description">
                    <p>{event.description}</p>
                    {event.location ? <p className="event-card-location">{event.location}</p> : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </section>
  )
}
