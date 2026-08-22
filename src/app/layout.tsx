import type { Metadata } from 'next'
import { Open_Sans, Passion_One, Patua_One } from 'next/font/google'
import type { ReactNode } from 'react'

import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister'
import { SiteShell } from '@/components/SiteShell'
import { getSiteSettings } from '@/lib/site-data'

import './globals.css'

const passionOne = Passion_One({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-passionone',
})

const patuaOne = Patua_One({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-patuaone',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  display: 'swap',
  variable: '--font-opensans',
})

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()

  return {
    title: siteSettings.siteName,
    description: 'Luonnontieteilijöiden risteilytapahtuma',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const siteSettings = await getSiteSettings()

  return (
    <html
      lang="fi"
      className={`${passionOne.variable} ${patuaOne.variable} ${openSans.variable}`}
    >
      <body>
        <ServiceWorkerRegister />
        <SiteShell
          eventYear={siteSettings.eventYear}
          footerText={siteSettings.footerText}
          harassmentFormUrl={siteSettings.harassmentFormUrl}
          siteName={siteSettings.siteName}
          socialLinks={siteSettings.socialLinks}
        >
          {children}
        </SiteShell>
      </body>
    </html>
  )
}
