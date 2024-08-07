import { Event } from '@/models';
import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
  _id: new Date().getTime(),
  title: 'Media maratón',
  notes: 'Preparar geles',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: 123,
    name: 'Daniel',
  },
};

interface initialStateProps {
  events: Event[];
  activeEvent: Event | null;
}

const initialState: initialStateProps = {
  events: [tempEvent],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: 'calendar',

  initialState,

  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },

    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
  },
});

export const { onSetActiveEvent, onAddNewEvent } = calendarSlice.actions;
