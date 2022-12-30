import { Message } from "@application/messages/entities/message";
import { UserViewModel } from "./user-view-model";

export class MessageViewModel {
  static toSocket(message: Message) {
    const user = message.user ? UserViewModel.toSocket(message.user) : null;

    return {
      id: message.id,
      from: message.from,
      text: message.text,
      roomId: message.roomId,
      createdAt: message.createdAt,
      user,
    };
  }
}
