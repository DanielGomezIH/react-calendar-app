import { User } from './user';

export interface Event {
  id: string | null;
  title: string;
  notes?: string;
  start: Date;
  end: Date;
  user: User;
}
