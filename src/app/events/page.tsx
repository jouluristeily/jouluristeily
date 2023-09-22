import { getEvents } from '@/lib/api';
import EventList from '@/components/events/EventList';

export default async function Events() {
  const eventsResponse = await getEvents();
  const events = eventsResponse.docs;

  return (
    <>
      <EventList events={events} />
    </>
  );
}
