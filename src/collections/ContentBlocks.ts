import type { CollectionConfig } from 'payload'

import { makeCollectionRevalidators } from '../hooks/revalidate'
import { simpleLexicalEditor } from '../lib/editor'

const blockPaths = (key?: string | null) => {
  switch (key) {
    case 'homepage':
      return ['/']
    case 'pricelist':
      return ['/prices']
    default:
      return []
  }
}

const { afterChange, afterDelete } = makeCollectionRevalidators<{
  id: number | string
  key?: string | null
}>(
  (doc) => blockPaths(doc?.key),
  ['content-blocks'],
)

export const ContentBlocks: CollectionConfig = {
  slug: 'content-blocks',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'key', 'updatedAt'],
    group: 'Website',
  },
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
    {
      name: 'key',
      type: 'select',
      required: true,
      unique: true,
      index: true,
      options: [
        {
          label: 'Homepage Intro',
          value: 'homepage',
        },
        {
          label: 'Price List Intro',
          value: 'pricelist',
        },
      ],
      admin: {
        position: 'sidebar',
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
