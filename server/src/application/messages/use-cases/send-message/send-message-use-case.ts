import { Message } from "@application/messages/entities/message";
import { MessagesRepository } from "@application/messages/repositories/messages-repository";
import { inject, injectable } from "tsyringe";

interface SendMessageRequest {
  from: string;
  text: string;
  roomId: string;
}

interface SendMessageResponse {
  message: Message;
}

@injectable()
export class SendMessageUseCase {
  constructor(
    @inject('MessagesRepository')
    private messagesRepository: MessagesRepository
  ) {}

  async execute(request: SendMessageRequest): Promise<SendMessageResponse> {
    const { from, roomId, text } = request;

    const message = new Message({ from, roomId, text });

    await this.messagesRepository.create(message);

    return { message };
  }
}
