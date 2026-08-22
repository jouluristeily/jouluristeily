import type { CollectionConfig } from 'payload'

import { makeCollectionRevalidators } from '../hooks/revalidate'

const { afterChange, afterDelete } = makeCollectionRevalidators<{ id: number | string }>(
  () => ['/events'],
  ['events'],
)

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'startAt', 'location'],
    group: 'Programme',
  },
  defaultSort: 'startAt',
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
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'startAt',
      type: 'date',
      required: true,
    },
    {
      name: 'endAt',
      type: 'date',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
    },
  ],
}
