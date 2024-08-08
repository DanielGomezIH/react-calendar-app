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
  hasEventSelected: boolean;
}

const initialState: initialStateProps = {
  events: [tempEvent],
  activeEvent: null,
  hasEventSelected: false,
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

    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) =>
        event._id === payload._id ? payload : event,
      );
      state.activeEvent = null;
    },

    onDeleteEvent: (state, { payload }) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => {
          event._id !== payload._id;
        });
        state.activeEvent = null;
      }
    },

    onSelectEvent: (state) => {
      state.hasEventSelected = true;
    },

    onDeselectEvent: (state) => {
      state.hasEventSelected = false;
    },
  },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onSelectEvent,
  onDeselectEvent,
} = calendarSlice.actions;
