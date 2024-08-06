import { z } from 'zod';
import { EventFormData } from '../../NewEventForm/NewEventForm';

export const EventSchema: z.ZodType<EventFormData> = z.object({
  startDate: z.date({
    required_error: 'Please enter a start date.',
  }),
  endDate: z.date({
    required_error: 'Please enter a end date.',
  }),
  title: z.string().min(2, {
    message: 'Your title must be at least 2 characters',
  }),
  notes: z.string().min(2, {
    message: 'Your note must be at least 2 characters',
  }),
});
