import { Event } from '@/models';
import {
  onAddNewEvent,
  onDeleteEvent,
  onDeselectEvent,
  onSelectEvent,
  onSetActiveEvent,
  onUpdateEvent,
  useAppDispatch,
  useAppSelector,
} from '@/store';

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent, hasEventSelected } = useAppSelector(
    (state) => state.calendar,
  );

  const setActiveEvent = (calendarEvent: Event) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: Event) => {
    if (calendarEvent._id !== null) {
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          _id: new Date().getTime(),
        }),
      );
    }
  };

  const startDeletingEvent = async (calendarEvent: Event) => {
    dispatch(onDeleteEvent({ ...calendarEvent }));
  };

  const setHasSelectedEvent = () => {
    dispatch(onSelectEvent());
  };

  const setHasNotSelectedEvent = () => {
    dispatch(onDeselectEvent());
  };

  return {
    //Properties
    events,
    activeEvent,
    hasEventSelected,

    //Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    setHasSelectedEvent,
    setHasNotSelectedEvent,
  };
};
