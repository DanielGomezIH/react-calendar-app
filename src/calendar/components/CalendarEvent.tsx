import { Event } from '@/models';

export const CalendarEvent = ( { event: CalendarEvent } ) => {

  const { title, user }: Event = CalendarEvent;

  return (
    <div className="w-full h-full">
      <p className="text-base leading-tight font-semibold">{ title }</p>
      <span className="text-base leading-tight font-normal"> - { user.name }</span>
    </div>
  );
};