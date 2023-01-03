import { makeMessage } from "@test/factories/message-factory";
import { InMemoryMessagesRepository } from "@test/repositories/in-memory-messages-repository";
import { GetLastRoomMessageUseCase } from "./get-last-room-message-use-case";

let getLastRoomMessageUseCase: GetLastRoomMessageUseCase;

let inMemoryMessagesRepository: InMemoryMessagesRepository;

describe('Get Last Message', () => {
  beforeEach(async () => {
    inMemoryMessagesRepository = new InMemoryMessagesRepository();

    getLastRoomMessageUseCase = new GetLastRoomMessageUseCase(
      inMemoryMessagesRepository
    );
  });

  it('should be able to get the last room message', async () => {
    await inMemoryMessagesRepository.create(makeMessage());
    await inMemoryMessagesRepository.create(makeMessage());
    await inMemoryMessagesRepository.create(makeMessage({
      text: 'Ache me!!',
      createdAt: new Date(new Date().getTime() + 1),
    }));

    const { message } = await getLastRoomMessageUseCase.execute({
      roomId: 'example-room-id'
    });

    const lastMessageIndex = inMemoryMessagesRepository.messages.length -1;

    expect(message).toEqual(
      inMemoryMessagesRepository.messages[lastMessageIndex],
    );
  });

  it('should not be able to get the last message from a non-existent room', async () => {
    const { message } = await getLastRoomMessageUseCase.execute({
      roomId: 'non-existent-room-id'
    });

    expect(message).toBeNull();
  });
});
