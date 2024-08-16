import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { calendarApi } from '../../src/api';
import { useAuthStore } from '../../src/hooks/useAuthStore.ts';
import { authSlice } from '../../src/store';
import { authenticatedState, initialState, notAuthenticatedState } from '../fixtures/authStates.ts';
import { testUserCredentials } from '../fixtures/testUser.ts';

const getMockStore = ( initialState ) => {
  return configureStore( {
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    }
  } );
};

describe( 'pruebas en useAuthStore', () => {

  beforeEach( () => localStorage.clear() );

  test( 'Debe de regresar los valores por defecto', () => {

    const mockStore = getMockStore( { ...initialState } );

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ( { children } ) => <Provider store={ mockStore }>{ children }</Provider>
    } );

    const { user, status, errorMessage } = result.current;

    expect( { user, status, errorMessage } ).toEqual( {
      status: 'checking',
      user: { uid: null, name: null, email: null },
      errorMessage: null,
    } );

  } );


  test( 'startLogin debe de autenticar correctamente un usuario', async () => {


    const mockStore = getMockStore( { ...notAuthenticatedState } );

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ( { children } ) => <Provider store={ mockStore }>{ children }</Provider>
    } );

    const { startLogin } = result.current;

    await act( async () => await startLogin( testUserCredentials ) );

    const { user, status, errorMessage } = result.current;

    expect( { user, status, errorMessage } ).toEqual( {
      user: {
        uid: '66bcfe9b323cff378a868571',
        name: 'Test User',
        email: 'test@gmail.com'
      },
      status: 'authenticated',
      errorMessage: null,
    } );

    expect( localStorage.getItem( 'token' ) ).toEqual( expect.any( String ) );
    expect( localStorage.getItem( 'token-init-date' ) ).toEqual( expect.any( String ) );

  } );

  test( 'startLogin debe de fallar al autenticar un usuario', async () => {


    const mockStore = getMockStore( { ...notAuthenticatedState } );

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ( { children } ) => <Provider store={ mockStore }>{ children }</Provider>
    } );

    const { startLogin } = result.current;

    await act( async () => await startLogin( { email: 'some@google.com', password: '12345678' } ) );

    const { user, status, errorMessage } = result.current;

    expect( { user, status, errorMessage } ).toEqual( {
      user: { uid: null, name: null, email: null },
      status: 'not-authenticated',
      errorMessage: 'The email or password is incorrect',
    } );

    expect( localStorage.getItem( 'token' ) ).toBeNull();
    expect( localStorage.getItem( 'token-init-date' ) ).toBeNull();

    waitFor(
      () => expect( result.current.errorMessage ).toBeNull()
    );

  } );

  test( 'starRegister debe de registrar un usuario', async () => {

    const newUser = { name: 'Thing', email: '@google.com', password: '12345678' };

    const mockStore = getMockStore( { ...notAuthenticatedState } );

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ( { children } ) => <Provider store={ mockStore }>{ children }</Provider>
    } );

    const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue( {
      data: {
        ok: true,
        name: 'Thing',
        uid: 'A1B2C3',
        token: 'TOKEN-ABC'
      }
    } );

    const { startRegister } = result.current;

    await act( async () => await startRegister( newUser ) );

    expect( result.current ).toEqual( {
      user: {
        uid: 'A1B2C3',
        name: 'Thing',
        email: '@google.com'
      },
      status: 'authenticated',
      errorMessage: null,
      checkAuthToken: expect.any( Function ),
      startLogin: expect.any( Function ),
      startLogout: expect.any( Function ),
      startRegister: expect.any( Function ),
    } );

    expect( localStorage.getItem( 'token' ) ).toEqual( expect.any( String ) );
    expect( localStorage.getItem( 'token-init-date' ) ).toEqual( expect.any( String ) );

    spy.mockRestore();

  } );

  test( 'starRegister debe de fallar al registar un usuario', async () => {

    const mockStore = getMockStore( { ...notAuthenticatedState } );

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ( { children } ) => <Provider store={ mockStore }>{ children }</Provider>
    } );

    const { startRegister } = result.current;

    await act( async () => await startRegister( testUserCredentials ) );

    const { user, status, errorMessage } = result.current;

    expect( { user, status, errorMessage } ).toEqual( {
      user: {
        uid: null,
        name: null,
        email: null
      },
      status: 'not-authenticated',
      errorMessage: "User already exists with that email",
    } );

    waitFor(
      () => expect( result.current.errorMessage ).toBeNull()
    );

  } );

  test( 'checkAuthToken debe de renovar el token y autenticar al usuario si tiene uno token existente', async () => {

    const mockStore = getMockStore( { ...initialState } );

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ( { children } ) => <Provider store={ mockStore }>{ children }</Provider>
    } );

    const { checkAuthToken, startLogin } = result.current;

    await act( async () => {
      await startLogin( testUserCredentials );
      await checkAuthToken();
    } );

    expect( localStorage.getItem( 'token' ) ).toEqual( expect.any( String ) );
    expect( localStorage.getItem( 'email' ) ).toEqual( expect.any( String ) );
    expect( localStorage.getItem( 'token-init-date' ) ).toEqual( expect.any( String ) );

  } );

  test( 'checkAuthToken debe de fallar si no hay un token', async () => {

    const mockStore = getMockStore( notAuthenticatedState );

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ( { children } ) => <Provider store={ mockStore }>{ children }</Provider>
    } );

    const { checkAuthToken } = result.current;

    await act( async () => await checkAuthToken() );

    const { user, status, errorMessage } = result.current;

    expect( { user, status, errorMessage } ).toEqual( {
      user: {
        uid: null,
        name: null,
        email: null
      },
      status: 'not-authenticated',
      errorMessage: null,
    } );

    expect( localStorage.getItem( 'token' ) ).toBeNull();
    expect( localStorage.getItem( 'email' ) ).toBeNull();
    expect( localStorage.getItem( 'token-init-date' ) ).toBeNull();

  } );

  test( 'starLogout debe de volver al estado inicial de autenticación', () => {

    const mockStore = getMockStore( { ...authenticatedState } );

    const { result } = renderHook( () => useAuthStore(), {
      wrapper: ( { children } ) => <Provider store={ mockStore }>{ children }</Provider>
    } );

    const { startLogout } = result.current;

    act( () => startLogout() );

    const { user, status, errorMessage } = result.current;

    expect( { user, status, errorMessage } ).toEqual( {
      user: {
        uid: null,
        name: null,
        email: null
      },
      status: 'not-authenticated',
      errorMessage: null,
    } );

  } );

} );