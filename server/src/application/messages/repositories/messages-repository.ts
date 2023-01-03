import { Message } from "../entities/message";

export interface MessagesRepository {
  create(message: Message): Promise<void>;
  findManyByRoomId(roomId: string): Promise<Message[]>;
  findLastByRoomId(roomId: string): Promise<Message | null>;
}
