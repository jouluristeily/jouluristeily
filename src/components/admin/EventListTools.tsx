'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useListQuery, useSelection } from '@payloadcms/ui'

type EventDocument = {
  id: number | string
  title: string
  description: string
  startAt: string
  endAt: string
  location?: string | null
  programme?: 'jouluristeily' | 'tuplis' | null
}

const yearBounds = (year: number) => ({
  greater_than_equal: `${year}-01-01T00:00:00.000Z`,
  less_than: `${year + 1}-01-01T00:00:00.000Z`,
})

const nextYear = (value: string) => {
  const date = new Date(value)
  date.setUTCFullYear(date.getUTCFullYear() + 1)
  return date.toISOString()
}

export function EventListTools() {
  const router = useRouter()
  const { handleWhereChange } = useListQuery()
  const { selectedIDs } = useSelection()
  const [years, setYears] = useState<number[]>([])
  const [selectedYear, setSelectedYear] = useState<number | ''>('')
  const [isCopying, setIsCopying] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const loadYears = async () => {
      const response = await fetch('/api/events?limit=200&sort=-startAt')
      if (!response.ok) return

      const { docs } = (await response.json()) as { docs: EventDocument[] }
      const availableYears = [...new Set(docs.map((event) => new Date(event.startAt).getUTCFullYear()))].sort(
        (left, right) => right - left,
      )

      setYears(availableYears)
      setSelectedYear(availableYears[0] ?? '')
    }

    void loadYears()
  }, [])

  const filterByYear = async (year: number | '') => {
    setSelectedYear(year)
    setMessage(null)
    await handleWhereChange?.(year === '' ? {} : { startAt: yearBounds(year) })
  }

  const copySelectedToNextYear = async () => {
    if (!selectedIDs.length || isCopying) return

    const sourceYear = selectedYear || new Date().getUTCFullYear()
    const targetYear = sourceYear + 1
    const count = selectedIDs.length
    const confirmed = window.confirm(
      `Kopioidaanko ${count} valittu${count === 1 ? ' tapahtuma' : 'a tapahtumaa'} vuodelle ${targetYear}? Alkuperäisiä ei muuteta.`,
    )

    if (!confirmed) return

    setIsCopying(true)
    setMessage(null)

    try {
      const sourceEvents = await Promise.all(
        selectedIDs.map(async (id) => {
          const response = await fetch(`/api/events/${id}`)
          if (!response.ok) throw new Error('Valitun tapahtuman lataus epäonnistui.')
          return (await response.json()) as EventDocument
        }),
      )

      await Promise.all(
        sourceEvents.map(async ({ id: _id, startAt, endAt, ...event }) => {
          const response = await fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...event,
              startAt: nextYear(startAt),
              endAt: nextYear(endAt),
            }),
          })

          if (!response.ok) throw new Error('Tapahtumien kopiointi epäonnistui.')
        }),
      )

      setMessage(`${count} tapahtuma${count === 1 ? '' : 'a'} kopioitiin vuodelle ${targetYear}.`)
      router.refresh()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Tapahtumien kopiointi epäonnistui.')
    } finally {
      setIsCopying(false)
    }
  }

  return (
    <section className="event-admin-tools" aria-label="Tapahtumien hallinta">
      <div>
        <p className="event-admin-tools__eyebrow">Ohjelmahallinta</p>
        <h2>Rajaa ja kopioi tapahtumia</h2>
      </div>
      <label>
        <span>Vuosi</span>
        <select value={selectedYear} onChange={(event) => void filterByYear(event.target.value ? Number(event.target.value) : '')}>
          <option value="">Kaikki vuodet</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
      <button type="button" onClick={() => void copySelectedToNextYear()} disabled={!selectedIDs.length || isCopying}>
        {isCopying ? 'Kopioidaan...' : `Kopioi valitut vuodelle ${(selectedYear || new Date().getUTCFullYear()) + 1}`}
      </button>
      <p className="event-admin-tools__help">Valitse ensin yksi tai useampi rivi listasta. Kopiointi säilyttää ohjelman, kuvauksen ja paikan.</p>
      {message ? <p className="event-admin-tools__message">{message}</p> : null}
    </section>
  )
}
