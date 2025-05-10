import { User } from './user';

export interface Session {
  token: string;
  userId: User;
}
