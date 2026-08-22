import type { Field } from 'payload'

const formatSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const slugField = (label = 'Slug'): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  label,
  required: true,
  unique: true,
  admin: {
    position: 'sidebar',
    description: 'Used in the page URL. Example: "guide" becomes /guide',
  },
  hooks: {
    beforeValidate: [
      ({ data, value }) => {
        if (typeof value === 'string' && value.trim().length > 0) {
          return formatSlug(value)
        }

        const source =
          typeof data?.title === 'string'
            ? data.title
            : typeof data?.name === 'string'
              ? data.name
              : ''

        return formatSlug(source)
      },
    ],
  },
})
