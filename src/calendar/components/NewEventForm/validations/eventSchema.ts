import { z } from 'zod';
import { Event, User } from '@/models';

export const UserSchema: z.ZodType<User> = z.object( {
  _id: z.union( [ z.string(), z.null() ] ),

  name: z.union( [ z.string(), z.null() ] ),
} );


export const EventSchema: z.ZodType<Event> = z.object( {
  id: z.union( [ z.string(), z.null() ] ),

  start: z.date( {
    required_error: 'Please enter a start date.',
  } ),

  end: z.date( {
    required_error: 'Please enter a end date.',
  } ),

  title: z.string().min( 2, {
    message: 'Your title must be at least 2 characters',
  } ),

  notes: z.string().optional(),

  user: UserSchema,
} );

