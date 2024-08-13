import { Event } from '@/models';
import { useRef } from 'react';

export const CalendarEvent = ( { event: CalendarEvent } ) => {

  const { title, user }: Event = CalendarEvent;

  // const { setHasNotSelectedEvent } = useCalendarStore();

  const ref = useRef<HTMLDivElement>( null );

  return (
    <div className="w-full h-full" ref={ ref }>
      <strong>{ title }</strong>
      <span> - { user.name }</span>
    </div>
  );
};