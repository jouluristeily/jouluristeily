'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'
import type { LinkItem } from '@/lib/site-data'

type SiteShellProps = {
  children: ReactNode
  footerText?: string | null
  harassmentFormUrl?: string | null
  siteName: string
  socialLinks?: LinkItem[] | null
}

export function SiteShell({
  children,
  footerText,
  harassmentFormUrl,
  siteName,
  socialLinks,
}: SiteShellProps) {
  const pathname = usePathname()

  if (pathname?.startsWith('/admin')) {
    return <>{children}</>
  }

  return (
    <div className="site-shell">
      <SiteHeader harassmentFormUrl={harassmentFormUrl} siteName={siteName} />
      <main className="site-main">{children}</main>
      <SiteFooter
        footerText={footerText}
        harassmentFormUrl={harassmentFormUrl}
        socialLinks={socialLinks}
      />
    </div>
  )
}
