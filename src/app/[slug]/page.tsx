import { notFound } from 'next/navigation'

import { RichTextRenderer } from '@/components/RichTextRenderer'
import { getPageBySlug, getPages } from '@/lib/site-data'

export const dynamicParams = true
export const revalidate = 60 * 60

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

  return (
    <div className="text-page-shell">
      <RichTextRenderer content={page.content} />
    </div>
  )
}
