import { notFound } from 'next/navigation'

import { RichTextRenderer } from '@/components/RichTextRenderer'
import { getPageBySlug, getPages } from '@/lib/site-data'

export const dynamicParams = true
export const revalidate = 3600

const pageBrandAssets: Record<string, string> = {
  loimu: '/loimu.svg',
  afterlecture: '/AL_logo.svg',
}

export async function generateStaticParams() {
  const pages = await getPages()

  return pages.map((page) => ({
    slug: page.slug,
  }))
}

export default async function ContentPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const page = await getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  const brandAsset = pageBrandAssets[slug]

  return (
    <div className="text-page-shell">
      {brandAsset ? <img src={brandAsset} className="page-brand-asset" alt={page.title} /> : null}
      <RichTextRenderer content={page.content} />
    </div>
  )
}
