import { useCalendarStore } from '@/hooks';
import { Event } from '@/models';
import { useEffect, useRef } from 'react';

export const CalendarEvent = ( { event: CalendarEvent } ) => {

  const { title, user }: Event = CalendarEvent;

  const { setHasNotSelectedEvent } = useCalendarStore();

  const ref = useRef<HTMLDivElement>( null );

  useEffect( () => {
    function handleClickOutside( event: MouseEvent ) {
      if ( ref.current && !ref.current.contains( event.target as Node ) ) {
        setHasNotSelectedEvent();
      }
    }
    document.addEventListener( 'click', handleClickOutside );
    return () => {
      document.removeEventListener( 'click', handleClickOutside );
    };
  }, [] );

  return (
    <div className="w-full h-full" ref={ ref }>
      <strong>{ title }</strong>
      <span> - { user.name }</span>
    </div>
  );
};