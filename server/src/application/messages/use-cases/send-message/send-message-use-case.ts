import { Message } from "../../entities/message";
import { MessagesRepository } from "../../repositories/messages-repository";

interface SendMessageRequest {
  from: string;
  text: string;
  roomId: string;
}

interface SendMessageResponse {
  message: Message;
}

export class SendMessageUseCase {
  constructor(private messagesRepository: MessagesRepository) {}

  async execute(request: SendMessageRequest): Promise<SendMessageResponse> {
    const { from, roomId, text } = request;

    const message = new Message({ from, roomId, text });

    await this.messagesRepository.create(message);

    return { message };
  }
}
