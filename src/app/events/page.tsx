import { Stack, Typography } from '@mui/material';
import { getEvents } from '@/lib/api';
import EventItem from '@/components/events/EventItem';

export default async function Events() {
  /* const eventsResponse = await getEvents();
  const events = eventsResponse.docs;

  return (
    <>
      <Stack alignItems="center" sx={{ maxWidth: '100%' }}>
        {events.map((event: any) => (
          <EventItem
            key={event.id}
            title={event.title}
            startTime={event.startTime}
            endTime={event.endTime}
            description={event.description}
            location={event.location}
          />
        ))}
      </Stack>
    </>
  ); */

  return (
    <Typography variant="h1" sx={{ textAlign: 'center' }}>
      Julkaistaan myöhemmin
    </Typography>
  );
}
