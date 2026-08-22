import { unstable_cache } from 'next/cache'

import { getPayloadClient } from '@/lib/payload'

export type RichTextContent = {
  root?: {
    children?: unknown[]
  }
}

export type LinkItem = {
  label: string
  url: string
}

export type SiteSettingsData = {
  siteName: string
  heroDateLabel?: string | null
  heroBlurb?: string | null
  galleryUrl?: string | null
  harassmentFormUrl?: string | null
  footerText?: string | null
  featuredLinks?: LinkItem[] | null
  programDownloads?: LinkItem[] | null
  socialLinks?: LinkItem[] | null
}

export type PageData = {
  title: string
  slug: string
  summary?: string | null
  content?: RichTextContent | null
}

export type ContentBlockData = {
  title: string
  key: string
  content?: RichTextContent | null
}

export type EventData = {
  title: string
  description: string
  startAt: string
  endAt: string
  location?: string | null
}

export type PriceData = {
  title: string
  type: 'jr_hytti' | 'tp_hytti' | 'appro' | 'ruokailu' | 'tp_ruokailu'
  price: string
  description?: string | null
  sortOrder?: number | null
}

const FALLBACK_SITE_SETTINGS: SiteSettingsData = {
  siteName: 'Jouluristeily 2025',
  heroDateLabel: '26.-28.11.2025',
  heroBlurb:
    'Tämä monorepo-versio käyttää Payloadin local APIa ja Nextin välimuistia, jotta sivu pysyy nopeana myös huonolla yhteydellä.',
  galleryUrl: 'https://jouluristeily.kuvat.fi/kuvat/',
  harassmentFormUrl: 'https://forms.gle/CzLeisKsvrChkwWC8',
  footerText: 'Jouluristeily 2025',
  featuredLinks: [
    { label: 'Hinnasto', url: '/prices' },
    { label: 'Ohjelma', url: '/events' },
  ],
  programDownloads: [],
  socialLinks: [
    { label: 'Facebook', url: 'https://www.facebook.com/jouluristeily' },
    { label: 'Instagram', url: 'https://www.instagram.com/jouluristeily/' },
  ],
}

const textContent = (text: string): RichTextContent => ({
  root: {
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text }],
      },
    ],
  },
})

// Keep inherited navigation usable until the old page content is migrated to Payload.
const FALLBACK_PAGES: PageData[] = [
  { title: 'Tuplis', slug: 'tuplis', content: textContent('Tuplis-tiedot julkaistaan täällä.') },
  { title: 'Matkaehdot', slug: 'terms', content: textContent('Matkaehdot julkaistaan täällä.') },
  { title: 'Ohjeet', slug: 'guide', content: textContent('Risteilyohjeet julkaistaan täällä.') },
  { title: 'Loimu', slug: 'loimu', content: textContent('Loimun tiedot julkaistaan täällä.') },
  {
    title: 'After Lecture',
    slug: 'afterlecture',
    content: textContent('After Lecturen tiedot julkaistaan täällä.'),
  },
]

const getCachedSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    return (await payload.findGlobal({
      slug: 'site-settings',
      depth: 0,
    })) as SiteSettingsData
  },
  ['site-settings'],
  {
    revalidate: 60 * 60 * 24,
    tags: ['site-settings'],
  },
)

const getCachedPages = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      depth: 0,
      limit: 100,
      sort: 'title',
    })

    return result.docs as unknown as PageData[]
  },
  ['pages'],
  {
    revalidate: 60 * 60 * 24,
    tags: ['pages'],
  },
)

const getCachedContentBlocks = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'content-blocks',
      depth: 0,
      limit: 25,
      sort: 'title',
    })

    return result.docs as unknown as ContentBlockData[]
  },
  ['content-blocks'],
  {
    revalidate: 60 * 60 * 24,
    tags: ['content-blocks'],
  },
)

const getCachedEvents = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'events',
      depth: 0,
      limit: 200,
      sort: 'startAt',
    })

    return result.docs as unknown as EventData[]
  },
  ['events'],
  {
    revalidate: 60 * 60 * 12,
    tags: ['events'],
  },
)

const getCachedPriceList = unstable_cache(
  async () => {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'price-list',
      depth: 0,
      limit: 200,
      sort: 'sortOrder',
    })

    return result.docs as unknown as PriceData[]
  },
  ['price-list'],
  {
    revalidate: 60 * 60 * 24,
    tags: ['price-list'],
  },
)

export const getSiteSettings = async () => {
  try {
    const result = await getCachedSiteSettings()
    return { ...FALLBACK_SITE_SETTINGS, ...result }
  } catch {
    return FALLBACK_SITE_SETTINGS
  }
}

export const getPages = async () => {
  try {
    const pages = await getCachedPages()
    return pages.length ? pages : FALLBACK_PAGES
  } catch {
    return FALLBACK_PAGES
  }
}

export const getPageBySlug = async (slug: string) => {
  const pages = await getPages()
  return pages.find((page) => page.slug === slug) ?? null
}

export const getContentBlockByKey = async (key: string) => {
  try {
    const blocks = await getCachedContentBlocks()
    return blocks.find((block) => block.key === key) ?? null
  } catch {
    return null
  }
}

export const getEvents = async () => {
  try {
    return await getCachedEvents()
  } catch {
    return []
  }
}

export const getPriceList = async () => {
  try {
    return await getCachedPriceList()
  } catch {
    return []
  }
}
