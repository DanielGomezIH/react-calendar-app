import {
  calendarSlice,
  onAddNewEvent,
  onCalendarLogout,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent
} from '../../../src/store/calendar/calendarSlice';

import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
  newEvent,
  updatedEvent
} from '../../fixtures/calendarStates';

describe( 'Pruebas en calendarSlice', () => {

  test( 'Debe de mostrar el estado inicial y llamarse calendar', () => {

    const state = calendarSlice.getInitialState();

    expect( state ).toEqual( initialState );

    expect( calendarSlice.name ).toBe( 'calendar' );
  } );

  test( 'onSetActiveEvent debe de activar el evento', () => {

    const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[ 0 ] ) );

    expect( state ).toEqual( calendarWithActiveEventState );
    expect( state.activeEvent ).toEqual( events[ 0 ] );

  } );

  test( 'onAddNewEvent debe de agregar el evento', () => {

    const state = calendarSlice.reducer( calendarWithActiveEventState, onAddNewEvent( newEvent ) );

    expect( state.events ).toEqual( [ ...events, newEvent ] );
    expect( state.activeEvent ).toBeNull();

  } );

  test( 'onUpdateEvent debe de actualizar el evento', () => {

    const state = calendarSlice.reducer( calendarWithActiveEventState, onUpdateEvent( updatedEvent ) );

    expect( state.events ).toContain( updatedEvent );

    expect( state.activeEvent ).toBeNull();

  } );

  test( 'onDeleteEvent debe de eliminar un evento', () => {

    const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent( events[ 0 ] ) );

    expect( state.events ).not.toContain( events[ 0 ] );

    expect( state.activeEvent ).toBeNull();

  } );

  test( 'onCalendarLogout debe de regresar al estado inicial', () => {

    const state = calendarSlice.reducer( calendarWithActiveEventState, onCalendarLogout() );

    expect( state ).toEqual( initialState );
  } );

  test( 'onLoadEvents', () => {

    const state = calendarSlice.reducer( initialState, onLoadEvents( events ) );

    expect( state.events ).toEqual( events );
    expect( state.isLoadingEvents ).toBeFalsy();

  } );

} );