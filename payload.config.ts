import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'

import { ContentBlocks } from './src/collections/ContentBlocks'
import { Events } from './src/collections/Events'
import { Pages } from './src/collections/Pages'
import { PriceList } from './src/collections/PriceList'
import { Users } from './src/collections/Users'
import { SiteSettings } from './src/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Jouluristeily CMS',
    },
  },
  collections: [Pages, ContentBlocks, Events, PriceList, Users],
  globals: [SiteSettings],
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
    connectOptions: {
      serverSelectionTimeoutMS: 5000,
    },
  }),
  graphQL: {
    disablePlaygroundInProduction: true,
  },
  secret: process.env.PAYLOAD_SECRET || '',
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  typescript: {
    outputFile: path.resolve(dirname, './src/payload-types.ts'),
  },
})
