import { Message } from "../../src/application/messages/entities/message";
import { MessagesRepository } from "../../src/application/messages/repositories/messages-repository";

export class InMemoryMessagesRepository implements MessagesRepository {
  public messages: Message[] = [];

  async create(message: Message): Promise<void> {
    this.messages.push(message);
  }

  async findManyByRoomId(roomId: string): Promise<Message[]> {
    return this.messages.filter(message => message.roomId === roomId);
  }
}
