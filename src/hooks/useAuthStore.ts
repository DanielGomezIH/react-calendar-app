import { calendarApi } from '@/api';
import { checking, clearErrorMessage, login, logout, onCalendarLogout, useAppDispatch, useAppSelector } from '@/store';

interface startLoginProps {
  email: string;
  password: string;
}

interface startRegisterProps {
  name: string;
  email: string;
  password: string;
}

export const useAuthStore = () => {

  const dispatch = useAppDispatch();

  const { user, status, errorMessage } = useAppSelector( ( state ) => state.auth );

  const startLogin = async ( { email, password }: startLoginProps ) => {

    dispatch( checking() );

    try {

      const { data } = await calendarApi.post( '/auth/', { email, password } );

      const currentDate = new Date().getTime().toString();

      localStorage.setItem( 'email', email );

      localStorage.setItem( 'token', data.token );

      localStorage.setItem( 'token-init-date', currentDate );

      dispatch( login( {
        uid: data.uid,
        name: data.name,
        email
      } ) );

    } catch ( error ) {

      dispatch( logout( 'The email or password is incorrect' ) );

      setTimeout( () => {
        dispatch( clearErrorMessage() );
      }, 2000 );
    }
  };

  const startRegister = async ( { name, email, password }: startRegisterProps ) => {

    dispatch( checking() );

    try {

      const { data } = await calendarApi.post( '/auth/register', { name, email, password } );

      const currentDate = new Date().getTime().toString();

      localStorage.setItem( 'email', email );

      localStorage.setItem( 'token', data.token );

      localStorage.setItem( 'token-init-date', currentDate );

      dispatch( login( {
        uid: data.uid,
        name: data.name,
        email
      } ) );

    } catch ( error ) {

      const typedError = error as {
        response: {
          data: {
            msg: string;
          };
        };
      };

      const { msg } = typedError.response.data;

      dispatch( logout( msg || 'Ups, something went wrong' ) );

      setTimeout( () => {
        dispatch( clearErrorMessage() );
      }, 2000 );
    }
  };

  const checkAuthToken = async () => {

    const token = localStorage.getItem( 'token' );
    const email = localStorage.getItem( 'email' );

    if ( !token || !email ) return dispatch( logout( null ) );

    try {

      const { data } = await calendarApi.get( '/auth/renew' );

      const currentDate = new Date().getTime().toString();

      localStorage.setItem( 'token', data.token );

      localStorage.setItem( 'token-init-date', currentDate );

      dispatch( login( {
        uid: data.uid,
        name: data.name,
        email: email || null
      } ) );

    } catch ( error ) {

      localStorage.clear();

      dispatch( logout( 'Access token expired' ) );

      setTimeout( () => {
        dispatch( clearErrorMessage() );
      }, 2000 );
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch( logout( null ) );
    dispatch( onCalendarLogout() );
  };

  return {
    //Properties
    user,
    status,
    errorMessage,

    //Methods
    checkAuthToken,
    startLogin,
    startLogout,
    startRegister,
  };
};
