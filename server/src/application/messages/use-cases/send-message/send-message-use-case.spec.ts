import { Message } from "@application/messages/entities/message";
import { InMemoryMessagesRepository } from "@test/repositories/in-memory-messages-repository";
import { SendMessageUseCase } from "./send-message-use-case";

let sendMessageUseCase: SendMessageUseCase;

let inMemoryMessagesRepository: InMemoryMessagesRepository;

describe('Send Message', () => {
  beforeEach(() => {
    inMemoryMessagesRepository = new InMemoryMessagesRepository();

    sendMessageUseCase = new SendMessageUseCase(inMemoryMessagesRepository);
  });

  it('should be able to send a message', async () => {
    await sendMessageUseCase.execute(new Message({
      from: 'example-user-id',
      roomId: 'example-room-id',
      text: 'Olá, este é um exemplo de mensagem!',
    }));

    expect(inMemoryMessagesRepository.messages).toHaveLength(1);
    expect(inMemoryMessagesRepository.messages[0].text).toEqual(
      'Olá, este é um exemplo de mensagem!',
    );
  });
});
