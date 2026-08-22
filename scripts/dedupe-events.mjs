import { MongoClient } from 'mongodb'

const databaseUrl = process.env.DATABASE_URL
const write = process.argv.includes('--write')

if (!databaseUrl) {
  console.error('DATABASE_URL is required in .env.')
  process.exitCode = 1
} else {
  const client = new MongoClient(databaseUrl)

  try {
    await client.connect()
    const events = client.db().collection('events')
    const duplicates = await events
      .aggregate([
        {
          $group: {
            _id: {
              title: '$title',
              startAt: '$startAt',
              programme: '$programme',
            },
            documents: { $push: '$$ROOT' },
            count: { $sum: 1 },
          },
        },
        { $match: { count: { $gt: 1 } } },
        { $sort: { '_id.startAt': 1, '_id.title': 1 } },
      ])
      .toArray()

    const redundantIDs = duplicates.flatMap(({ documents }) => {
      const sorted = [...documents].sort((left, right) => {
        const completeness = (document) => Number(Boolean(document.programme)) + Number(Boolean(document.description))
        return completeness(right) - completeness(left) || new Date(left.createdAt || 0).getTime() - new Date(right.createdAt || 0).getTime()
      })

      return sorted.slice(1).map((document) => document._id)
    })

    console.log(`Found ${duplicates.length} duplicate event group(s), with ${redundantIDs.length} redundant document(s).`)
    for (const duplicate of duplicates) {
      console.log(`${duplicate._id.startAt.toISOString()} | ${duplicate._id.programme || 'unclassified'} | ${duplicate._id.title} (${duplicate.count})`)
    }

    if (write && redundantIDs.length) {
      const result = await events.deleteMany({ _id: { $in: redundantIDs } })
      console.log(`Deleted ${result.deletedCount} redundant event document(s).`)
    } else if (!write) {
      console.log('No documents were changed. Run `npm run dedupe:events -- --write` to remove only the listed duplicates.')
    }
  } finally {
    await client.close()
  }
}
