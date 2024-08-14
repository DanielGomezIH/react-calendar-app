import { parseISO } from 'date-fns';

interface DatabaseEvent {
  id: string;
  title: string;
  notes?: string;
  start: string;
  end: string;
  user: DatabaseUser;
}

export interface FormattedEvent {
  id: string;
  title: string;
  notes?: string;
  start: Date;
  end: Date;
  user: DatabaseUser;
}

interface DatabaseUser {
  name: string;
  _id: string;
}

export const convertEventsToDateEvents = ( events: DatabaseEvent[] ) => {
  return events.map( ( event ) => {
    const formattedEvent: FormattedEvent = {
      ...event,
      start: parseISO( event.start ),
      end: parseISO( event.end ),
    };
    return formattedEvent;
  } );
};