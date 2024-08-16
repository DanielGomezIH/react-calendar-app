import { initialStateCalendarProps } from '../../src/store/calendar/calendarSlice';

export const newEvent = {
  title: "Estudiar matematicas",
  notes: "Revisar divisiones por dos numeros",
  start: "1970-01-01T00:00:02.000Z",
  end: "1970-01-01T00:01:40.000Z",
  user: {
    _id: "66bcfe9b323cff378a868571",
    name: "Test User",
  },
  id: "3",
};

export const updatedEvent = {
  title: "Estudiar programación y react",
  notes: "Aprender next",
  start: "1970-01-01T00:00:02.000Z",
  end: "1970-01-01T00:01:40.000Z",
  user: {
    _id: "66bcfe9b323cff378a868571",
    name: "Test User",
  },
  id: "1",
};

export const events = [
  {
    title: "Estudiar programación",
    notes: "Realizar pruebas unitarias",
    start: "1970-01-01T00:00:02.000Z",
    end: "1970-01-01T00:01:40.000Z",
    user: {
      _id: "66bcfe9b323cff378a868571",
      name: "Test User",
    },
    id: "1",
  },
  {
    title: "Estudiar inglés",
    notes: "Revisar el past perfect",
    start: "1970-01-01T00:00:02.000Z",
    end: "1970-01-01T00:01:40.000Z",
    user: {
      _id: "66bcfe9b323cff378a868571",
      name: "Test User",
    },
    id: "2",
  }
];

export const initialState: initialStateCalendarProps = {
  events: [],
  isLoadingEvents: true,
  activeEvent: null,
};

export const calendarWithEventsState: initialStateCalendarProps = {
  events: [ ...events ],
  isLoadingEvents: true,
  activeEvent: null,
};

export const calendarWithActiveEventState: initialStateCalendarProps = {
  events: [ ...events ],
  isLoadingEvents: true,
  activeEvent: { ...events[ 0 ] },
};
