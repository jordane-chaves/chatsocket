import { Message } from "../../entities/message";
import { MessagesRepository } from "../../repositories/messages-repository";

interface ListRoomMessagesRequest {
  roomId: string;
}

interface ListRoomMessagesResponse {
  messages: Message[];
}

export class ListRoomMessagesUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute(request: ListRoomMessagesRequest): Promise<ListRoomMessagesResponse> {
    const { roomId } = request;

    const messages = await this.messagesRepository.findManyByRoomId(roomId);

    return { messages };
  }
}
