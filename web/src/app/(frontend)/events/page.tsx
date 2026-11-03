import { getPayload } from 'payload'

import config from '@/payload.config'
import { COMPLEX_OPTIONS } from '@/collections/News'
import { EventsFilter } from './EventsFilter'

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs } = await payload.find({
    collection: 'events',
    sort: '-date',
    limit: 200,
  })

  const items = docs.map((doc) => ({
    id: String(doc.id),
    title: doc.title,
    date: doc.date,
    complex: doc.complex,
    text: doc.text ?? '',
    place: doc.place ?? '',
  }))

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 20px 100px' }}>
      <h1 style={{ fontWeight: 300, fontSize: 'clamp(26px,4vw,40px)', letterSpacing: '-0.03em' }}>
        Мероприятия
      </h1>
      <EventsFilter items={items} options={COMPLEX_OPTIONS} />
    </div>
  )
}
