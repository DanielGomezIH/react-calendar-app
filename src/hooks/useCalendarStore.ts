import { calendarApi } from '@/api';
import { convertEventsToDateEvents } from '@/helpers';
import { toastErrorStyles, toastSuccessStyles } from '@/lib';
import { Event } from '@/models';
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
  useAppDispatch,
  useAppSelector
} from '@/store';
import { toast } from 'sonner';

export const useCalendarStore = () => {

  const dispatch = useAppDispatch();

  const { events, activeEvent, isLoadingEvents } = useAppSelector(
    ( state ) => state.calendar,
  );

  const setActiveEvent = ( calendarEvent: Event ) => {
    dispatch( onSetActiveEvent( calendarEvent ) );
  };

  const startSavingEvent = async ( calendarEvent: Event ) => {

    try {

      if ( calendarEvent.id !== null ) {

        await calendarApi.put( `/events/${ calendarEvent.id }`, calendarEvent );

        dispatch( onUpdateEvent( { ...calendarEvent } ) );

        toast.success( 'Event updated successfully', { style: toastSuccessStyles } );

        return;
      }

      const { data } = await calendarApi.post( '/events/', calendarEvent );

      dispatch(
        onAddNewEvent( {
          ...calendarEvent,
          id: data.event.id,
        } ),
      );

      toast.success( 'Event created successfully', {
        style: toastSuccessStyles,
        duration: 1000
      } );

    } catch ( error ) {
      console.log( error );
      toast.error( 'Error saving event', {
        style: toastErrorStyles,
        duration: 1000
      } );
    }
  };

  const startLoadingEvents = async () => {

    try {
      const { data } = await calendarApi.get( '/events/' );

      const events = convertEventsToDateEvents( data.events );

      dispatch( onLoadEvents( events ) );

    } catch ( error ) {
      console.log( error );
      toast.error( 'Error loading events', {
        style: toastErrorStyles,
        duration: 1000
      } );
    }
  };

  const startDeletingEvent = async ( calendarEvent: Event ) => {
    try {

      await calendarApi.delete( `/events/${ calendarEvent.id }` );

      dispatch( onDeleteEvent( { ...calendarEvent } ) );

      toast.success( 'Event deleted successfully', {
        style: toastSuccessStyles,
        duration: 1000
      } );

    } catch ( error ) {
      console.log( error );
      toast.error( 'Error deleting event', {
        style: toastErrorStyles,
        duration: 1000
      } );
    }
  };

  return {
    //Properties
    events,
    isLoadingEvents,
    activeEvent,

    //Methods
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
