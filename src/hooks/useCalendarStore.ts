import { Event } from '@/models';
import {
  onAddNewEvent,
  onSetActiveEvent,
  useAppDispatch,
  useAppSelector,
} from '@/store';

export const useCalendarStore = () => {
  const dispatch = useAppDispatch();
  const { events, activeEvent } = useAppSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent: Event) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: Event) => {
    if (calendarEvent?._id) {
      //actualizando
    } else {
      //creando
      dispatch(
        onAddNewEvent({
          _id: new Date().getTime(),
          ...calendarEvent,
        }),
      );
    }
  };

  return {
    //Properties
    events,
    activeEvent,

    //Methods
    setActiveEvent,
    startSavingEvent,
  };
};
