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
const serverURL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
).origin

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
    // MONGODB_URI keeps local setup compatible with the legacy Payload project.
    url: process.env.DATABASE_URL || process.env.MONGODB_URI || '',
    connectOptions: {
      serverSelectionTimeoutMS: 5000,
    },
  }),
  graphQL: {
    disablePlaygroundInProduction: true,
  },
  secret: process.env.PAYLOAD_SECRET || '',
  // Payload adds serverURL to its CSRF allowlist and compares it with the
  // browser's Origin header. URL.origin removes paths and trailing slashes so
  // authenticated POST requests are not rejected because of formatting.
  serverURL,
  typescript: {
    outputFile: path.resolve(dirname, './src/payload-types.ts'),
  },
})
