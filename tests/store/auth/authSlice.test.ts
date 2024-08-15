import {
  authSlice,
  checking,
  clearErrorMessage,
  login,
  logout
} from '../../../src/store/auth/authSlice';

import {
  authenticatedState,
  initialState,
  notAuthenticatedState
} from '../../fixtures/authStates';

import { userLoginCredentials } from '../../fixtures/testUser';

describe( 'Pruebas en authSlice', () => {

  test( 'Debe mostrar el estado inicial y llamarse auth', () => {

    const state = authSlice.getInitialState();

    expect( state ).toEqual( initialState );

    expect( authSlice.name ).toBe( 'auth' );

  } );

  test( 'Debe de realizar login', () => {

    const state = authSlice.reducer( initialState, login( userLoginCredentials ) );

    expect( state ).toEqual( authenticatedState );
    expect( state.user ).not.toBeNull();

  } );

  test( 'Debe de realizar logout', () => {

    const state = authSlice.reducer( authenticatedState, logout( null ) );

    expect( state ).toEqual( notAuthenticatedState );
    expect( state.user.uid ).toBeNull();
    expect( state.errorMessage ).toBeNull();

  } );

  test( 'Debe de realizar logout con un mensaje de error', () => {

    const errorMessage = 'Invalid credentials';

    const state = authSlice.reducer( authenticatedState, logout( errorMessage ) );

    notAuthenticatedState.errorMessage = errorMessage;

    expect( state ).toEqual( notAuthenticatedState );
    expect( state.user.uid ).toBeNull();
    expect( state.errorMessage ).toBe( errorMessage );

  } );

  test( 'Debe de limpiar el mensaje de error', () => {

    const errorMessage = 'Invalid credentials';

    const state = authSlice.reducer( authenticatedState, logout( errorMessage ) );

    const newState = authSlice.reducer( state, clearErrorMessage() );

    expect( newState.errorMessage ).toBeNull();

  } );

  test( 'Debe de llamar el checking', () => {

    const state = authSlice.reducer( authenticatedState, checking() );

    expect( state ).toEqual( initialState );

  } );
} );