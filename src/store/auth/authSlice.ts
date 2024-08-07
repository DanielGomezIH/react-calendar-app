import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',

  initialState: {
    value: 10,
  },

  reducers: {
    increment: (state /* action */) => {
      state.value += 1;
    },
  },
});

export const { increment } = authSlice.actions;
