import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useUiStore } from '../../src/hooks/useUiStore';
import { uiSlice } from '../../src/store';

const getMockStore = ( initialState ) => {
  return configureStore( {
    reducer: {
      ui: uiSlice.reducer
    },
    preloadedState: {
      ui: { ...initialState }
    }
  } );
};

describe( 'Pruebas en useUistore', () => {

  test( 'Retorna los valores por defecto', () => {

    const mockStore = getMockStore( { isDateModalOpen: false } );

    const { result } = renderHook( () => useUiStore(), {
      wrapper: ( { children } ) => <Provider store={ mockStore }>{ children }</Provider>
    } );

    expect( result.current ).toEqual( {
      isDateModalOpen: false,
      openDateModal: expect.any( Function ),
      closeDateModal: expect.any( Function ),
    } );
  } );

  test( 'openDateModal debe de colocar true en el isDateOpenModal', () => {

    const mockStore = getMockStore( { isDateModalOpen: false } );

    const { result } = renderHook( () => useUiStore(), {
      wrapper: ( { children } ) => <Provider store={ mockStore }>{ children }</Provider>
    } );

    const { openDateModal } = result.current;

    act( () => openDateModal() );

    expect( result.current.isDateModalOpen ).toBeTruthy();
  } );

  test( 'closeDateModal debe de colocar false en el isDateOpenModal', () => {

    const mockStore = getMockStore( { isDateModalOpen: true } );

    const { result } = renderHook( () => useUiStore(), {
      wrapper: ( { children } ) => <Provider store={ mockStore }>{ children }</Provider>
    } );

    const { closeDateModal } = result.current;

    act( () => closeDateModal() );

    expect( result.current.isDateModalOpen ).toBeFalsy();
  } );

} );