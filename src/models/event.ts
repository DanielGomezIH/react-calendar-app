import type { User } from './user';

export interface Event {
  _id?: number;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: User;
}
