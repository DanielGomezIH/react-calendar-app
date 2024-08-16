import { render, screen } from '@testing-library/react';
import { AppRouter } from '../../src/router/AppRouter.tsx';

import { MemoryRouter } from 'react-router-dom';
import { useAuthStore } from '../../src/hooks/useAuthStore.ts';


jest.mock( '../../src/hooks/useAuthStore.ts' );

jest.mock( '../../src/calendar/pages/CalendarPage/CalendarPage.tsx', () => ( {
  CalendarPage: () => <h1>CalendarPage</h1>
} ) );

describe( 'Pruebas en <AppRouter />', () => {

  const mockCheckAuthToken = jest.fn();


  test( 'Debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {

    useAuthStore.mockReturnValue( {
      status: 'checking',
      checkAuthToken: mockCheckAuthToken
    } );

    render(
      <AppRouter />
    );

    const loaderIcon = screen.getByLabelText( 'Loader' );

    expect( loaderIcon ).toBeTruthy();
    expect( mockCheckAuthToken ).toHaveBeenCalled();
  } );

  test( 'Debe de mostrar la pantalla de login si no hay un usuario autenticado', () => {

    useAuthStore.mockReturnValue( {
      status: 'not-authenticated',
      checkAuthToken: mockCheckAuthToken
    } );

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    const loginHeader = screen.getByRole( 'heading', { level: 3, name: 'Login' } );

    expect( loginHeader ).toBeTruthy();
    expect( mockCheckAuthToken ).toHaveBeenCalled();
  } );

  test( 'Debe de mostrar la pantalla de CalendarPage si hay un usuario autenticado', () => {

    useAuthStore.mockReturnValue( {
      status: 'authenticated',
      checkAuthToken: mockCheckAuthToken
    } );

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    const calendarTitle = screen.getByText( 'CalendarPage' );

    expect( calendarTitle ).toBeTruthy();
    expect( mockCheckAuthToken ).toHaveBeenCalled();
  } );

} );