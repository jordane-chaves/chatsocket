import { Message } from "@application/messages/entities/message";
import { MessagesRepository } from "@application/messages/repositories/messages-repository";

interface ListRoomMessagesRequest {
  roomId: string;
}

interface ListRoomMessagesResponse {
  messages: Message[];
}

export class ListRoomMessagesUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute(
    request: ListRoomMessagesRequest
  ): Promise<ListRoomMessagesResponse> {
    const { roomId } = request;

    const messages = await this.messagesRepository.findManyByRoomId(roomId);

    return { messages };
  }
}
