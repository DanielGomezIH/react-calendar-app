import { Event } from '@/models';
import { useRef } from 'react';

export const CalendarEvent = ( { event: CalendarEvent } ) => {

  const { title, user }: Event = CalendarEvent;

  const ref = useRef<HTMLDivElement>( null );

  return (
    <div className="w-full h-full" ref={ ref }>
      <p className="text-base leading-tight font-semibold">{ title }</p>
      <span className="text-base leading-tight font-normal"> - { user.name }</span>
    </div>
  );
};