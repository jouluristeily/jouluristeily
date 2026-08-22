import { MongoClient } from 'mongodb'

const databaseUrl = process.env.DATABASE_URL
const write = process.argv.includes('--write')

const at = (date, time) => new Date(`${date}T${time}:00+02:00`)

const event = (date, start, end, title, location, programme, description) => {
  const startAt = at(date, start)
  const endAt = at(date, end)

  if (endAt <= startAt) {
    endAt.setUTCDate(endAt.getUTCDate() + 1)
  }

  return {
    title,
    description,
    startAt,
    endAt,
    location,
    programme,
  }
}

// Transcribed from the supplied 2025 JR and Tuplis handbooks. Only programme items are seeded.
const programmeEvents = [
  event('2025-11-26', '20:15', '20:30', 'Baltic Princess lähtee Turusta', 'Baltic Princess', 'tuplis', 'Tuplis-risteily alkaa.'),
  event('2025-11-26', '20:30', '23:00', 'Beer Pongia', 'Klubi', 'tuplis', 'Beer Pong Turun järjestämä Beer Pong -ohjelma.'),
  event('2025-11-26', '23:00', '00:00', 'Tupliksen iltastartti', 'Klubi', 'tuplis', 'Kisailuja ja rahanarvoisia etuja.'),
  event('2025-11-27', '00:00', '04:30', 'Laivan DJ', 'Klubi', 'tuplis', 'Laivan DJ soittaa Klubilla.'),
  event('2025-11-27', '12:00', '13:00', 'Kaalimato Bingo', 'Starlight', 'tuplis', 'Bingo-ohjelmaa Starlightissa.'),
  event('2025-11-27', '13:00', '14:00', 'Speed Friending', 'Starlight', 'tuplis', 'Tutustu uusiin ihmisiin Speed Friendingissä.'),
  event('2025-11-27', '18:30', '18:45', 'Baltic Princess saapuu Turkuun', 'Baltic Princess', 'tuplis', 'Tuplis-risteily päättyy Turussa.'),
  event('2025-11-27', '19:30', '19:45', 'Baltic Princess lähtee Turusta', 'Baltic Princess', 'jouluristeily', 'Jouluristeily alkaa.'),
  event('2025-11-27', '19:30', '21:00', 'Trubaduuri Jaco', 'Sea Pub', 'jouluristeily', 'Trubaduuri Jaco esiintyy Sea Pubissa.'),
  event('2025-11-27', '20:00', '22:00', 'Maskeerausta', 'Piano Bar', 'jouluristeily', 'Maskeerausta Piano Barissa.'),
  event('2025-11-27', '20:00', '22:00', 'Star Image -valokuvausseinä', 'Info, kansi 6', 'jouluristeily', 'Virallinen valokuvausseinä Infon edessä.'),
  event('2025-11-27', '20:00', '22:00', 'Beer Pong Turku', 'Iskelmäbaari', 'jouluristeily', 'Beer Pong Turun järjestämä Beer Pong -ohjelma.'),
  event('2025-11-27', '20:30', '22:30', 'Ständit', 'Starlightin edusta ja Piano Bar', 'jouluristeily', 'Tutustu järjestöjen ja yhteistyökumppaneiden ständeihin.'),
  event('2025-11-27', '21:00', '22:00', 'Musavisailu', 'Sea Pub', 'jouluristeily', 'Musavisailua Sea Pubissa.'),
  event('2025-11-27', '21:45', '00:30', 'Pianisti Christopher', 'Piano Bar', 'jouluristeily', 'Pianisti Christopher viihdyttää matkustajia.'),
  event('2025-11-27', '22:00', '22:30', 'Avajaisshow', 'Starlight', 'jouluristeily', 'Avajaisshow, jonka starttaa tanssiryhmä The Honeys.'),
  event('2025-11-27', '22:00', '01:00', 'Karaoke', 'Iskelmäbaari', 'jouluristeily', 'Karaoke raikaa Iskelmäbaarissa.'),
  event('2025-11-27', '22:30', '00:15', 'Trubaduuri Jaco', 'Sea Pub', 'jouluristeily', 'Trubaduuri Jaco esiintyy Sea Pubissa.'),
  event('2025-11-27', '22:45', '00:00', 'HybridiSpeksin bilebändi', 'Starlight', 'jouluristeily', 'HybridiSpeksin bilebändi esiintyy Starlightissa.'),
  event('2025-11-28', '00:00', '04:30', 'DJ Eiestoi', 'Klubi', 'jouluristeily', 'DJ Eiestoi starttaa bileet Klubilla.'),
  event('2025-11-28', '00:30', '01:30', 'Teflon Brothers', 'Kansi 10', 'jouluristeily', 'Illan pääartisti Teflon Brothers.'),
  event('2025-11-28', '01:45', '04:30', 'DJ PikkuMiska', 'Starlight', 'jouluristeily', 'DJ PikkuMiska pitää bileet käynnissä yön pikkutunneille.'),
  event('2025-11-28', '12:00', '15:00', 'Ständit', 'Starlightin edusta ja Piano Bar', 'jouluristeily', 'Tutustu järjestöjen ja yhteistyökumppaneiden ständeihin.'),
  event('2025-11-28', '13:00', '15:00', 'Amazing Loimu Race', 'Loimun ständit', 'jouluristeily', 'Loimun jäsenille suunnattu kilpailu.'),
  event('2025-11-28', '13:00', '15:00', 'Peliluola', 'Kokousosasto, kansi 5', 'jouluristeily', 'Pelaamista kokousosastolla.'),
  event('2025-11-28', '13:00', '16:00', 'Ennustaja Esmeralda', 'Piano Bar', 'jouluristeily', 'Ennustaja Esmeralda Piano Barissa.'),
  event('2025-11-28', '13:30', '15:15', 'Pianisti Christopher', 'Piano Bar', 'jouluristeily', 'Pianisti Christopher viihdyttää matkustajia.'),
  event('2025-11-28', '14:00', '15:30', 'Skumppajoogaa', 'Starlight', 'jouluristeily', 'Skumppajoogaa Starlightissa.'),
  event('2025-11-28', '15:00', '18:00', 'Karaoke', 'Iskelmäbaari', 'jouluristeily', 'Karaoke raikaa Iskelmäbaarissa.'),
  event('2025-11-28', '15:30', '16:00', 'Pubivisa', 'Sea Pub', 'jouluristeily', 'Pubivisa Sea Pubissa.'),
  event('2025-11-28', '15:30', '16:30', 'Risteilybingo', 'Starlight', 'jouluristeily', 'Risteilybingo Starlightissa.'),
  event('2025-11-28', '16:00', '16:45', 'Trubaduuri Jaco', 'Sea Pub', 'jouluristeily', 'Trubaduuri Jaco esiintyy Sea Pubissa.'),
  event('2025-11-28', '16:45', '18:00', 'Laivan bilebändi: Lisää Skumppaa!', 'Starlight', 'jouluristeily', 'Laivan bilebändi esiintyy Starlightissa.'),
  event('2025-11-28', '18:30', '18:45', 'Baltic Princess saapuu Turkuun', 'Baltic Princess', 'jouluristeily', 'Jouluristeily päättyy Turussa.'),
]

if (!databaseUrl) {
  console.error('DATABASE_URL is required in .env.')
  process.exitCode = 1
} else {
  const client = new MongoClient(databaseUrl)

  try {
    await client.connect()
    const events = client.db().collection('events')

    if (write) {
      await events.bulkWrite(
        programmeEvents.map((item) => ({
          updateOne: {
            filter: { title: item.title, startAt: item.startAt },
            update: { $set: item },
            upsert: true,
          },
        })),
      )
    }

    console.log(`${write ? 'Seeded' : 'Would seed'} ${programmeEvents.length} programme events.`)
    if (!write) {
      console.log('No documents were changed. Run `npm run seed:programme-2025 -- --write` to populate the schedule.')
    }
  } finally {
    await client.close()
  }
}
