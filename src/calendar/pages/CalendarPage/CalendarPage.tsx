import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Calendar, View, Views } from 'react-big-calendar';

import { CalendarLayout } from '@/calendar/layout';

import { AddNewButton, CalendarEvent, DeleteButton, NewEventModal } from '@/calendar/components';

import { localizer } from '@/helpers';
import { useCalendarStore, useUiStore } from '@/hooks';
import type { Event } from '@/models';
import { useEffect, useState } from 'react';

interface EventStyle {
  style: React.CSSProperties;
}

export const CalendarPage = () => {

  const { openDateModal } = useUiStore();

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const initialView = localStorage.getItem( 'lastView' ) as View | null;

  const [ lastView, setLastView ] = useState<View>( initialView || Views.WEEK );

  const eventStyleGetter = (): EventStyle => {

    const style: React.CSSProperties = {
      backgroundColor: '#3b6bf6',
      borderRadius: '8px',
      opacity: 0.8,
      color: 'white',
    };

    return { style };
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = ( event: Event ) => {
    setActiveEvent( event );
  };

  const onViewChanged = ( view: View ) => {
    localStorage.setItem( 'lastView', view );
    setLastView( view );
  };

  useEffect( () => {
    startLoadingEvents();
  }, [] );

  return (
    <CalendarLayout>
      <Calendar
        localizer={ localizer }
        events={ events }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={ { height: 'calc(100vh - 128px)' } }
        eventPropGetter={ eventStyleGetter }
        components={ {
          event: CalendarEvent,
        } }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <NewEventModal />

      <AddNewButton />
      <DeleteButton />
    </CalendarLayout>
  );
};
