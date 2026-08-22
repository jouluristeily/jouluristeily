import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from '../hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Website',
  },
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'Jouluristeily 2025',
    },
    {
      name: 'heroDateLabel',
      type: 'text',
      defaultValue: '26.-28.11.2025',
    },
    {
      name: 'eventYear',
      type: 'number',
      defaultValue: 2025,
      admin: {
        description: 'Used in year-specific public labels, such as the price list.',
      },
    },
    {
      name: 'heroBlurb',
      type: 'textarea',
      label: 'Homepage intro (plain text)',
      admin: {
        description: 'A short plain-text introduction shown below the homepage hero. Use the Homepage Intro content block for formatted text.',
      },
      defaultValue:
        'Kevyt, nopeasti latautuva tapahtumasivu, jonka sisältöä voi päivittää ilman erillistä frontti- ja backendiä.',
    },
    {
      name: 'featuredLinks',
      type: 'array',
      defaultValue: [
        {
          label: 'Hinnasto',
          url: '/prices',
        },
        {
          label: 'Ohjelma',
          url: '/events',
        },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'programDownloads',
      type: 'array',
      defaultValue: [
        {
          label: 'Tuplis25 Käsiohjelma',
          url: '/TUPLIS25_Kasiohjelma.pdf',
        },
        {
          label: 'JR25 Käsiohjelma',
          url: '/JR25_kasiohjelma.pdf',
        },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'galleryUrl',
      type: 'text',
      defaultValue: 'https://jouluristeily.kuvat.fi/kuvat/',
    },
    {
      name: 'harassmentFormUrl',
      type: 'text',
      defaultValue: 'https://forms.gle/CzLeisKsvrChkwWC8',
    },
    {
      name: 'socialLinks',
      type: 'array',
      defaultValue: [
        {
          label: 'Facebook',
          url: 'https://www.facebook.com/jouluristeily',
        },
        {
          label: 'Instagram',
          url: 'https://www.instagram.com/jouluristeily/',
        },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'footerText',
      type: 'text',
      defaultValue: 'Jouluristeily 2025',
    },
  ],
}
