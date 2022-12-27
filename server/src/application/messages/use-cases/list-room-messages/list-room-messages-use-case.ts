import { Message } from "@application/messages/entities/message";
import { MessagesRepository } from "@application/messages/repositories/messages-repository";
import { inject, injectable } from "tsyringe";

interface ListRoomMessagesRequest {
  roomId: string;
}

interface ListRoomMessagesResponse {
  messages: Message[];
}

@injectable()
export class ListRoomMessagesUseCase {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: MessagesRepository
  ) {}

  async execute(
    request: ListRoomMessagesRequest
  ): Promise<ListRoomMessagesResponse> {
    const { roomId } = request;

    const messages = await this.messagesRepository.findManyByRoomId(roomId);

    return { messages };
  }
}
