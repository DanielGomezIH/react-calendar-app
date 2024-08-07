import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
  name: 'calendar',

  initialState: {
    value: 10,
  },

  reducers: {
    increment: (state /* action */) => {
      state.value += 1;
    },
  },
});

export const { increment } = calendarSlice.actions;
