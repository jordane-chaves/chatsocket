import { Message } from "@application/messages/entities/message";
import { MessagesRepository } from "@application/messages/repositories/messages-repository";
import { inject, injectable } from "tsyringe";

interface GetLastRoomMessageRequest {
  roomId: string;
}

interface GetLastRoomMessageResponse {
  message: Message | null;
}

@injectable()
export class GetLastRoomMessageUseCase {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: MessagesRepository
  ) {}

  async execute(
    data: GetLastRoomMessageRequest
  ): Promise<GetLastRoomMessageResponse> {
    const { roomId } = data;

    const message = await this.messagesRepository.findLastByRoomId(roomId);

    if (!message) {
      return { message: null };
    }

    return { message };
  }
}
