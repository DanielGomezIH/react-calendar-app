import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice
} from '../../../src/store/ui/uiSlice';

describe( 'Pruebas en uiSlice', () => {

  const initialState = {
    isDateModalOpen: false,
  };

  const openDateModalState = {
    isDateModalOpen: true,
  };

  test( 'Debe mostrar el estado inicial y llamarse ui', () => {

    const state = uiSlice.getInitialState();

    expect( state ).toEqual( initialState );

    expect( uiSlice.name ).toBe( 'ui' );
  } );

  test( 'Debe de cambiar el isDateModalOpen a true correctamente', () => {

    const state = uiSlice.reducer( initialState, onOpenDateModal() );

    expect( state ).toEqual( openDateModalState );
    expect( state.isDateModalOpen ).toBeTruthy();

  } );

  test( 'Debe de cambiar el isDateModalOpen a false correctamente', () => {

    const state = uiSlice.reducer( openDateModalState, onCloseDateModal() );

    expect( state ).toEqual( initialState );
    expect( state.isDateModalOpen ).toBeFalsy();;

  } );

} );