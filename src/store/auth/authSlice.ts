import { createSlice } from '@reduxjs/toolkit';

export interface User {
  uid: string | null;
  name: string | null,
  email: string | null;
}

export interface initialStateProps {
  status: 'checking' | 'not-authenticated' | 'authenticated';

  user: User;

  errorMessage: string | null;
}

const initialState: initialStateProps = {
  status: 'checking',

  user: {
    uid: null,
    name: null,
    email: null,
  },

  errorMessage: null,
};

export const authSlice = createSlice( {
  name: 'auth',

  initialState,

  reducers: {
    checking: ( state ) => {
      state.status = 'checking';
      state.user = {
        uid: null,
        name: null,
        email: null,
      };
      state.errorMessage = null;
    },

    login: ( state, { payload } ) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = null;
    },

    logout: ( state, { payload } ) => {
      state.status = 'not-authenticated';
      state.user = {
        uid: null,
        name: null,
        email: null,
      };
      state.errorMessage = payload || null;
    },

    clearErrorMessage: ( state ) => {
      state.errorMessage = null;
    }
  },
} );

export const { checking, login, logout, clearErrorMessage } = authSlice.actions;
