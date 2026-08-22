import { MongoClient } from 'mongodb'

const sourceUrl = process.env.LEGACY_DATABASE_URL
const destinationUrl = process.env.DATABASE_URL
const write = process.argv.includes('--write')

const contentKeys = new Set(['homepage', 'pricelist', 'tuplis', 'terms', 'guide', 'loimu', 'afterlecture'])
const priceTypes = new Set(['jr_hytti', 'tp_hytti', 'appro', 'ruokailu', 'tp_ruokailu'])

const emptyRichText = {
  root: {
    children: [
      {
        type: 'paragraph',
        children: [{ type: 'text', text: '' }],
      },
    ],
    direction: null,
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
}

const slugify = (value) =>
  value
    .trim()
    .toLocaleLowerCase('fi-FI')
    .replace(/[ä]/g, 'a')
    .replace(/[ö]/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const richText = (...candidates) =>
  candidates.find((candidate) => candidate && typeof candidate === 'object' && candidate.root) ||
  emptyRichText

const timestamps = (document) => ({
  ...(document.createdAt ? { createdAt: document.createdAt } : {}),
  ...(document.updatedAt ? { updatedAt: document.updatedAt } : {}),
})

const upsert = async (collection, filter, document) => {
  if (write) {
    await collection.updateOne(filter, { $set: document }, { upsert: true })
  }
}

if (!sourceUrl || !destinationUrl) {
  console.error('LEGACY_DATABASE_URL and DATABASE_URL are required in .env.')
  process.exitCode = 1
} else {
  const sourceClient = new MongoClient(sourceUrl)
  const destinationClient = new MongoClient(destinationUrl)

  try {
    await Promise.all([sourceClient.connect(), destinationClient.connect()])

    const source = sourceClient.db()
    const destination = destinationClient.db()

    if (source.databaseName === destination.databaseName) {
      throw new Error('Source and destination database names must be different.')
    }

    console.log(`${write ? 'Writing' : 'Dry run'}: ${source.databaseName} -> ${destination.databaseName}`)

    const [legacyPages, legacyContents, legacyEvents, legacyPrices] = await Promise.all([
      source.collection('pages').find({}).toArray(),
      source.collection('contents').find({}).toArray(),
      source.collection('events').find({}).sort({ startTime: 1 }).toArray(),
      source.collection('price-lists').find({}).sort({ createdAt: 1, title: 1 }).toArray(),
    ])

    let migratedPages = 0
    for (const page of legacyPages) {
      const slug = slugify(page.title)
      if (!slug) continue

      await upsert(destination.collection('pages'), { slug }, {
        title: page.title,
        slug,
        content: richText(page.content, page.richtext),
        ...timestamps(page),
      })
      migratedPages += 1
    }

    let migratedBlocks = 0
    const skippedBlocks = []
    for (const block of legacyContents) {
      const key = slugify(block.title)
      if (!contentKeys.has(key)) {
        skippedBlocks.push(block.title)
        continue
      }

      await upsert(destination.collection('content-blocks'), { key }, {
        title: block.title,
        key,
        content: richText(block.lexicalRichText?.jsonContent, block.body),
        ...timestamps(block),
      })
      migratedBlocks += 1
    }

    let migratedEvents = 0
    for (const event of legacyEvents) {
      await upsert(destination.collection('events'), { title: event.title, startAt: event.startTime }, {
        title: event.title,
        description: event.description,
        startAt: event.startTime,
        endAt: event.endTime,
        ...(event.location ? { location: event.location } : {}),
        ...timestamps(event),
      })
      migratedEvents += 1
    }

    let migratedPrices = 0
    const skippedPrices = []
    for (const [sortOrder, price] of legacyPrices.entries()) {
      if (!priceTypes.has(price.type)) {
        skippedPrices.push(`${price.title} (${price.type})`)
        continue
      }

      await upsert(destination.collection('price-lists'), {
        title: price.title,
        type: price.type,
        price: price.price,
      }, {
        title: price.title,
        type: price.type,
        price: price.price,
        ...(price.description ? { description: price.description } : {}),
        sortOrder,
        ...timestamps(price),
      })
      migratedPrices += 1
    }

    console.log(`Pages: ${migratedPages}`)
    console.log(`Content blocks: ${migratedBlocks}`)
    console.log(`Events: ${migratedEvents}`)
    console.log(`Price rows: ${migratedPrices}`)
    console.log(`Skipped content blocks: ${skippedBlocks.length ? skippedBlocks.join(', ') : 'none'}`)
    console.log(`Skipped price rows: ${skippedPrices.length ? skippedPrices.join(', ') : 'none'}`)
    console.log('Legacy users, preferences, and Payload system collections were intentionally not migrated.')

    if (!write) {
      console.log('No documents were changed. Run `npm run migrate:legacy -- --write` to perform this migration.')
    }
  } finally {
    await Promise.all([sourceClient.close(), destinationClient.close()])
  }
}
