import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from '../hooks/revalidate'
import {
  defaultTicketButtonLabel,
  defaultTicketSalesPlacements,
  getKideTicketUrl,
  ticketSalesPlacements,
  type TicketSalesData,
} from '../lib/ticket-sales'

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
      name: 'ticketSales',
      type: 'group',
      label: 'Ticket sales (Kide.app)',
      admin: {
        description: 'Manage ticket links across the website from here. Add your Kide.app event URL, choose placements, then enable ticket sales and save.',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Show ticket sales links',
          defaultValue: false,
          admin: {
            description: 'Turn off to hide all managed ticket links without deleting the URL.',
          },
        },
        {
          name: 'url',
          type: 'text',
          hasMany: false,
          label: 'Kide.app ticket URL',
          admin: {
            placeholder: 'https://kide.app/events/...',
            description: 'Paste the full public HTTPS link to your ticket sales page on Kide.app. Required when ticket sales links are enabled.',
          },
          validate: (value, { siblingData }) => {
            if (!value?.trim()) {
              return (siblingData as TicketSalesData)?.enabled
                ? 'Add a Kide.app URL before enabling ticket sales links.'
                : true
            }
            return getKideTicketUrl(value) ? true : 'Enter a valid HTTPS URL on kide.app.'
          },
        },
        {
          name: 'buttonLabel',
          type: 'text',
          label: 'Button text',
          defaultValue: defaultTicketButtonLabel,
          maxLength: 60,
          admin: {
            description: 'Default: Osta liput. Navigation uses the short label Liput to fit smaller screens. Kide.app is shown alongside the button text.',
          },
        },
        {
          name: 'placements',
          type: 'select',
          label: 'Show links in',
          hasMany: true,
          defaultValue: defaultTicketSalesPlacements,
          options: [...ticketSalesPlacements],
          admin: {
            description: 'Select where ticket links appear. Clear all selections to hide them everywhere.',
          },
        },
      ],
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
      label: 'Programme downloads',
      admin: {
        description: 'Add links to programme PDFs hosted anywhere, such as Google Drive, OneDrive, or Vercel Blob.',
      },
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
          label: 'Download URL',
          admin: {
            description: 'Use a direct public link to the PDF or download page.',
          },
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
