'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import { TicketSalesLink } from '@/components/TicketSales'
import { getTicketSalesLink, type TicketSalesData } from '@/lib/ticket-sales'

type SiteHeaderProps = {
  eventYear?: number | null
  harassmentFormUrl?: string | null
  siteName: string
  ticketSales?: TicketSalesData | null
}

const internalItems = (eventYear?: number | null) => [
  { href: '/', label: eventYear ? `JR ${eventYear}` : 'Jouluristeily' },
  { href: '/tuplis', label: 'Tuplis' },
  { href: '/terms', label: 'Matkaehdot' },
  { href: '/guide', label: 'Ohjeet' },
  { href: '/events', label: 'Ohjelma' },
  { href: '/gallery', label: 'Galleria' },
  { href: '/prices', label: 'Hinnasto' },
  { href: '/loimu', label: 'Loimu' },
  { href: '/afterlecture', label: 'After Lecture' },
]

const priorityItems = [
  { href: '/events', label: 'Ohjelma' },
  { href: '/prices', label: 'Hinnasto' },
]

export function SiteHeader({ eventYear, harassmentFormUrl, siteName, ticketSales }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const hasTicketLink = Boolean(getTicketSalesLink(ticketSales, 'navigation'))
  const visiblePriorityItems = hasTicketLink
    ? priorityItems.filter((item) => item.href !== '/prices')
    : priorityItems

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    const closeOnDesktop = () => {
      if (window.matchMedia('(min-width: 1280px)').matches) {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnDesktop)

    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnDesktop)
    }
  }, [])

  return (
    <header className="site-header">
      <nav className="site-nav-frame" aria-label="Main navigation">
        <div className="site-nav-inner">
          <Link
            href="/"
            className="site-home-link"
            onClick={() => setOpen(false)}
            aria-label={`${siteName} etusivu`}
          >
            <img src="/site-icon.svg" className="site-home-icon" alt={`${siteName} icon`} />
          </Link>

          <div className="site-nav-priority" role="group" aria-label="Quick links">
            {visiblePriorityItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="site-nav-priority-link"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <TicketSalesLink
              sales={ticketSales}
              placement="navigation"
              variant="compact"
              onClick={() => setOpen(false)}
            />
          </div>

          <button
            type="button"
            className="site-nav-toggle"
            onClick={() => setOpen((value) => !value)}
            aria-controls="site-nav-list"
            aria-expanded={open}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
              width="20"
              height="20"
            >
              <path
                stroke="red"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          <div className="site-nav-menu" data-open={open}>
            <ul id="site-nav-list" className="site-nav-list" data-open={open}>
              {internalItems(eventYear).map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="site-nav-link" onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}

              {harassmentFormUrl ? (
                <li>
                  <a
                    href={harassmentFormUrl}
                    className="site-nav-link"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    Häirintäilmoitus
                  </a>
                </li>
              ) : null}
              {hasTicketLink ? (
                <li>
                  <TicketSalesLink
                    sales={ticketSales}
                    placement="navigation"
                    variant="compact"
                    onClick={() => setOpen(false)}
                  />
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
