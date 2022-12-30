import { User } from "./User";

export interface Message {
  id: string;
  from: string;
  text: string;
  roomId: string;
  createdAt: Date;
  user: User;
}
