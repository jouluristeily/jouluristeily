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
    defaultColumns: ['title', 'programme', 'startAt', 'location'],
    group: 'Programme',
    components: {
      beforeList: ['/src/components/admin/EventListTools#EventListTools'],
    },
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
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd.MM.yyyy HH:mm',
          timeFormat: 'HH:mm',
          timeIntervals: 15,
        },
      },
    },
    {
      name: 'endAt',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd.MM.yyyy HH:mm',
          timeFormat: 'HH:mm',
          timeIntervals: 15,
        },
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'programme',
      type: 'select',
      defaultValue: 'jouluristeily',
      options: [
        {
          label: 'Jouluristeily',
          value: 'jouluristeily',
        },
        {
          label: 'Tuplis',
          value: 'tuplis',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
