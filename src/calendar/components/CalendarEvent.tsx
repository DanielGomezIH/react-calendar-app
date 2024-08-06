import { Event } from '@/models';

export const CalendarEvent = ( { event } ) => {

  const { title, user }: Event = event;

  return (
    <>
      <strong>{ title }</strong>
      <span> - { user.name }</span>
    </>
  );
};