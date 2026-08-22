import { MongoClient } from 'mongodb'

const legacyDatabaseUrl = process.env.LEGACY_DATABASE_URL

const describeValue = (value, depth = 0) => {
  if (value === null) return 'null'
  if (value instanceof Date) return 'date'

  if (Array.isArray(value)) {
    if (!value.length) return 'array[]'
    return [`array[${describeValue(value[0], depth + 1)}]`]
  }

  if (typeof value === 'object') {
    if (depth >= 3) return 'object'

    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => key !== '_id')
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, child]) => [key, describeValue(child, depth + 1)]),
    )
  }

  return typeof value
}

if (!legacyDatabaseUrl) {
  console.error('LEGACY_DATABASE_URL is required. Add it to .env and run the command again.')
  process.exitCode = 1
} else {
  const client = new MongoClient(legacyDatabaseUrl)

  try {
    await client.connect()

    const database = client.db()
    const collections = await database.listCollections({}, { nameOnly: true }).toArray()

    console.log(`Connected to legacy database: ${database.databaseName}`)
    console.log('No documents will be changed by this command.\n')

    for (const { name } of collections.sort((a, b) => a.name.localeCompare(b.name))) {
      const collection = database.collection(name)
      const [count, sample] = await Promise.all([
        collection.estimatedDocumentCount(),
        collection.findOne({}, { projection: { _id: 0 } }),
      ])
      const fields = sample ? Object.keys(sample).sort().join(', ') : '(empty)'

      console.log(`${name}: ${count} document(s)`)
      console.log(`  fields: ${fields}`)

      if (sample) {
        console.log(`  shape: ${JSON.stringify(describeValue(sample))}`)
      }

      if (sample && Object.hasOwn(sample, 'title')) {
        const titles = await collection
          .find({}, { projection: { _id: 0, title: 1 } })
          .sort({ title: 1 })
          .toArray()
        console.log(`  titles: ${titles.map(({ title }) => JSON.stringify(title)).join(', ')}`)
      }
    }
  } finally {
    await client.close()
  }
}
