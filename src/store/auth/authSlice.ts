import { createSlice } from '@reduxjs/toolkit';

interface initialStateProps {
  status: 'checking' | 'not-authenticated' | 'authenticated';

  user: User;

  errorMessage: string | null;
}

interface User {
  uid: string | null;
  name: string | null;
  email: string | null;
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

export const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    checking: (state) => {
      state.status = 'checking';
      state.user = {
        uid: null,
        name: null,
        email: null,
      };
      state.errorMessage = null;
    },

    login: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = null;
    },
  },
});

export const { checking, login } = authSlice.actions;
