import type { User } from './user';

export interface Event {
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: User;
}
