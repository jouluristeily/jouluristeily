import React from 'react';
import EventItem, { EventItemProps } from './EventItem';

interface EventListProps {
  events: EventItemProps[];
}

function EventList({ events }: EventListProps) {
  // Separate events into "Now," "Upcoming," and "Past" sections
  const now = new Date();
  const nowEvents = events.filter((event) => new Date(event.startTime) <= now);
  const upcomingEvents = events.filter((event) => new Date(event.startTime) > now);
  const pastEvents = events.filter((event) => new Date(event.endTime) < now);

  return (
    <div>
      {nowEvents.length > 0 && (
        <div className="mb-4 mt-4">
          <h1 className="text-2xl font-semibold text-center mb-4">Now</h1>
          <div className="flex flex-col items-center">
            {nowEvents.map((event, index) => (
              <EventItem key={index} {...event} />
            ))}
          </div>
        </div>
      )}

      {upcomingEvents.length > 0 && (
        <div className="mb-4 mt-4">
          <h1 className="text-2xl font-semibold text-center mb-4">Upcoming</h1>
          <div className="flex flex-col items-center">
            {upcomingEvents.map((event, index) => (
              <EventItem key={index} {...event} />
            ))}
          </div>
        </div>
      )}

      {pastEvents.length > 0 && (
        <div className="mb-4">
          <h1 className="text-2xl font-semibold text-center mb-4">Past</h1>
          <div className="flex flex-col items-center">
            {pastEvents.map((event, index) => (
              <EventItem key={index} {...event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default EventList;
