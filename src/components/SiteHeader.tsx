'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

type SiteHeaderProps = {
  harassmentFormUrl?: string | null
  siteName: string
}

const internalItems = [
  { href: '/', label: 'JR 2025' },
  { href: '/tuplis', label: 'Tuplis' },
  { href: '/terms', label: 'Matkaehdot' },
  { href: '/guide', label: 'Ohjeet' },
  { href: '/events', label: 'Ohjelma' },
  { href: '/gallery', label: 'Galleria' },
  { href: '/prices', label: 'Hinnasto' },
  { href: '/loimu', label: 'Loimu' },
  { href: '/afterlecture', label: 'After Lecture' },
]

export function SiteHeader({ harassmentFormUrl, siteName }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

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
      if (window.matchMedia('(min-width: 768px)').matches) {
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
            <img src="/icon.svg" className="site-home-icon" alt={`${siteName} icon`} />
          </Link>

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
              {internalItems.map((item) => (
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
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
