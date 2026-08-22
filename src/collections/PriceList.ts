import type { CollectionConfig } from 'payload'

import { makeCollectionRevalidators } from '../hooks/revalidate'

const { afterChange, afterDelete } = makeCollectionRevalidators<{ id: number | string }>(
  () => ['/prices'],
  ['price-list'],
)

export const PriceList: CollectionConfig = {
  slug: 'price-list',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'price', 'sortOrder'],
    group: 'Website',
  },
  defaultSort: 'sortOrder',
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
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'JR hytti',
          value: 'jr_hytti',
        },
        {
          label: 'Tuplis hytti',
          value: 'tp_hytti',
        },
        {
          label: 'Approlippu',
          value: 'appro',
        },
        {
          label: 'Ruokailu',
          value: 'ruokailu',
        },
        {
          label: 'Tuplis-Ruokailu',
          value: 'tp_ruokailu',
        },
      ],
      defaultValue: 'jr_hytti',
    },
    {
      name: 'price',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
