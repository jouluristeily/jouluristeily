import type { CollectionConfig } from 'payload'

import { slugField } from '../fields/slug'
import { makeCollectionRevalidators } from '../hooks/revalidate'
import { simpleLexicalEditor } from '../lib/editor'

const { afterChange, afterDelete } = makeCollectionRevalidators<{
  id: number | string
  slug?: string | null
}>(
  (doc) => (doc?.slug ? [`/${doc.slug}`] : []),
  ['pages'],
)

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Website',
  },
  defaultSort: 'title',
  hooks: {
    afterChange: [afterChange],
    afterDelete: [afterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField(),
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        description: 'Short intro shown above the full content.',
      },
    },
    {
      name: 'content',
      type: 'richText',
      editor: simpleLexicalEditor,
      required: true,
    },
  ],
}
