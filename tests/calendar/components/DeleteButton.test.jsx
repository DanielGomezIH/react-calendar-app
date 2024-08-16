import { render, screen, fireEvent } from '@testing-library/react';

import { DeleteButton } from '../../../src/calendar/components/DeleteButton';

import { useCalendarStore } from '../../../src/hooks/useCalendarStore.ts';
import { useUiStore } from '../../../src/hooks/useUiStore.ts';

import { events } from '../../fixtures/calendarStates.ts';

jest.mock( '../../../src/hooks/useCalendarStore.ts' );
jest.mock( '../../../src/hooks/useUiStore.ts' );

describe( 'Pruebas en <DeleteButton />', () => {

  const mockStartDeletingEvent = jest.fn();

  beforeEach( () => jest.clearAllMocks() );

  test( 'Debe de mostrar el componente correctamente', () => {

    useCalendarStore.mockReturnValue( {
      activeEvent: { ...events[ 0 ] }
    } );

    useUiStore.mockReturnValue( {
      isDateModalOpen: false
    } );

    const { container } = render( <DeleteButton /> );

    const buttonHTML = screen.findByRole( 'button' );

    expect( buttonHTML ).toBeTruthy();

    expect( container ).toMatchSnapshot();

  } );

  test( 'No debe mostrar el componente si no hay un evento activo', () => {

    useCalendarStore.mockReturnValue( {
      activeEvent: null
    } );

    useUiStore.mockReturnValue( {
      isDateModalOpen: false
    } );

    const { container } = render( <DeleteButton /> );

    expect( container ).toMatchSnapshot();

  } );


  test( 'Debe de llamar startDeletingEvent si hay un evento activo', async () => {

    useCalendarStore.mockReturnValue( {
      activeEvent: { ...events[ 0 ] },
      startDeletingEvent: mockStartDeletingEvent
    } );

    useUiStore.mockReturnValue( {
      isDateModalOpen: false
    } );

    render( <DeleteButton /> );

    const buttonHTML = await screen.findByRole( 'button' );

    fireEvent.click( buttonHTML );

    expect( mockStartDeletingEvent ).toHaveBeenCalled();

  } );

} );
