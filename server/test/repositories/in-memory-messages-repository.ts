import { Message } from "@application/messages/entities/message";
import { MessagesRepository } from "@application/messages/repositories/messages-repository";

export class InMemoryMessagesRepository implements MessagesRepository {
  public messages: Message[] = [];

  async create(message: Message): Promise<void> {
    this.messages.push(message);
  }

  async findManyByRoomId(roomId: string): Promise<Message[]> {
    return this.messages.filter(message => message.roomId === roomId);
  }

  async findLastByRoomId(roomId: string): Promise<Message> {
    const messages = this.messages.filter(message => message.roomId === roomId);

    const descendingSortMessages = messages.sort((a, b) =>
      b.createdAt.getTime() - a.createdAt.getTime()
    );

    const lastMessage = descendingSortMessages[0];

    return lastMessage;
  }
}
