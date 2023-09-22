import React from 'react';

export interface EventItemProps {
  title: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
}

function EventItem({ title, startTime, endTime, description, location }: EventItemProps) {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const startHour = start.getHours();
  const startMinutes = start.getMinutes().toString().padStart(2, '0');
  const endMinutes = end.getMinutes().toString().padStart(2, '0');
  const timeString = `${startHour}:${startMinutes} - ${end.getHours()}:${endMinutes}`;
  const dayAbbreviation = start.toLocaleDateString('fi', { weekday: 'short' });

  return (
    <div className=" border border-gray-300 p-4 rounded shadow mb-4 flex max-w-md">
      <div className="flex flex-col items-center justify-center w-16 h-16 text-white mr-4 pt-9">
        <span className="text-6xl text-red-500 font-semibold">{startHour}</span>
        <span className="text-4xl text-black font-semibold">{dayAbbreviation}</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold">
          {title} @ {location}
        </h2>
        <p className="font-medium">{timeString}</p>

        <div className="mt-2 border-t border-gray-300 pt-2">
          {description}

          <p className="font-medium">{location}</p>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
