import { Message } from "@application/messages/entities/message";

export class MessageViewModel {
  static toSocket(message: Message) {
    return {
      id: message.id,
      from: message.from,
      text: message.text,
      roomId: message.roomId,
      createdAt: message.createdAt,
    };
  }
}
