'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import type { LinkItem } from '@/lib/site-data'
import type { TicketSalesData } from '@/lib/ticket-sales'

type SiteShellProps = {
  children: ReactNode
  eventYear?: number | null
  footerText?: string | null
  harassmentFormUrl?: string | null
  siteName: string
  socialLinks?: LinkItem[] | null
  ticketSales?: TicketSalesData | null
}

export function SiteShell({
  children,
  eventYear,
  footerText,
  harassmentFormUrl,
  siteName,
  socialLinks,
  ticketSales,
}: SiteShellProps) {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return <>{children}</>
  }

  return (
    <div className="site-shell">
      <SiteHeader
        eventYear={eventYear}
        harassmentFormUrl={harassmentFormUrl}
        siteName={siteName}
        ticketSales={ticketSales}
      />
      <main className="site-main">{children}</main>
      <SiteFooter
        footerText={footerText}
        harassmentFormUrl={harassmentFormUrl}
        socialLinks={socialLinks}
        ticketSales={ticketSales}
      />
    </div>
  )
}
