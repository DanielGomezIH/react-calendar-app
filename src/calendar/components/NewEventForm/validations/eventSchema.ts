import { z } from 'zod';
import { Event } from '@/models';

export const EventSchema: z.ZodType<Event> = z.object({
  _id: z.union([z.number(), z.null()]),

  start: z.date({
    required_error: 'Please enter a start date.',
  }),

  end: z.date({
    required_error: 'Please enter a end date.',
  }),

  title: z.string().min(2, {
    message: 'Your title must be at least 2 characters',
  }),

  notes: z.string().optional(),

  bgColor: z.string(),

  user: z.object({
    _id: z.union([z.number(), z.null()]),
    name: z.string(),
  }),
});
