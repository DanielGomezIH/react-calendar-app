import 'react-big-calendar/lib/css/react-big-calendar.css';

import { addHours } from 'date-fns';
import { Calendar, View, Views } from 'react-big-calendar';

import { CalendarLayout } from '@/calendar/layout';

import { CalendarEvent, NewEventModal } from '@/calendar/components';

import { localizer } from '@/helpers';
import type { Event } from '@/models';
import { useState } from 'react';

const events: Event[] = [ {
  title: 'Media maratón',
  notes: 'Preparar geles',
  start: new Date(),
  end: addHours( new Date(), 2 ),
  bgColor: '#fafafa',
  user: {
    _id: 123,
    name: 'Daniel'
  }
} ];

interface EventStyle {
  style: React.CSSProperties;
}

export const CalendarPage = () => {

  const initialView = localStorage.getItem( 'lastView' ) as View | null;

  const [ lastView, setLastView ] = useState<View>( initialView || Views.WEEK );

  const eventStyleGetter = ( event: Event, start: Date, end: Date, isSelected: boolean ): EventStyle => {
    const style: React.CSSProperties = {
      backgroundColor: '#347CF7',
      borderRadius: '8px',
      opacity: 0.8,
      color: 'white',
    };

    return { style };
  };

  const onDoubleClick = ( event: Event ) => {
    console.log( { doubleClick: event } );
  };

  const onSelect = ( event: Event ) => {
    console.log( { click: event } );
  };

  const onViewChanged = ( view: View ) => {
    localStorage.setItem( 'lastView', view );
    setLastView( view );
  };

  return (
    <CalendarLayout>
      <Calendar
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={ { height: 'calc(100vh - 112px)' } }
        eventPropGetter={ eventStyleGetter }
        components={ {
          event: CalendarEvent
        } }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <NewEventModal triggerTitle={ "Modal" } />
    </CalendarLayout>
  );
};
