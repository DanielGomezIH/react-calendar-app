import { Event } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

interface initialStateProps {
  events: Event[];
  isLoadingEvents: boolean;
  activeEvent: Event | null;
}

const initialState: initialStateProps = {
  events: [],
  isLoadingEvents: true,
  activeEvent: null,
};

export const calendarSlice = createSlice( {
  name: 'calendar',

  initialState,

  reducers: {
    onSetActiveEvent: ( state, { payload } ) => {
      state.activeEvent = payload;
    },

    onAddNewEvent: ( state, { payload } ) => {
      state.events.push( payload );
      state.activeEvent = null;
    },

    onUpdateEvent: ( state, { payload } ) => {
      state.events = state.events.map( ( event ) =>
        event.id === payload.id ? payload : event,
      );
      state.activeEvent = null;
    },

    onLoadEvents: ( state, { payload } ) => {
      state.isLoadingEvents = false;

      payload.forEach( ( dbEvent ) => {
        const exists = state.events.some( event => event.id === dbEvent.id );
        if ( !exists ) {
          state.events.push( dbEvent );
        }
      } );
    },

    onDeleteEvent: ( state, { payload } ) => {

      if ( state.activeEvent !== null && state.activeEvent.id !== null ) {
        state.events = state.events.filter( ( event ) => event.id !== payload.id );
        state.activeEvent = null;
      }

    },
  },
} );

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;
