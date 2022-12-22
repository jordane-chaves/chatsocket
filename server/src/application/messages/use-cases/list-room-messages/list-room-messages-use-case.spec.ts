
import { makeMessage } from "@test/factories/message-factory";
import { InMemoryMessagesRepository } from "@test/repositories/in-memory-messages-repository";
import { ListRoomMessagesUseCase } from "./list-room-messages-use-case";

let listRoomMessagesUseCase: ListRoomMessagesUseCase;

let inMemoryMessagesRepository: InMemoryMessagesRepository;

describe('List Room Messages', () => {
  beforeEach(() => {
    inMemoryMessagesRepository = new InMemoryMessagesRepository();

    listRoomMessagesUseCase = new ListRoomMessagesUseCase(inMemoryMessagesRepository);
  });

  it('should be able to list messages by room id', async () => {
    await inMemoryMessagesRepository.create(makeMessage({ roomId: 'room-1' }));
    await inMemoryMessagesRepository.create(makeMessage({ roomId: 'room-1' }));

    await inMemoryMessagesRepository.create(makeMessage({ roomId: 'room-2' }));
    await inMemoryMessagesRepository.create(makeMessage({ roomId: 'room-2' }));
    await inMemoryMessagesRepository.create(makeMessage({ roomId: 'room-2' }));

    const { messages } = await listRoomMessagesUseCase.execute({
      roomId: 'room-2'
    });

    expect(messages).toHaveLength(3);
    expect(messages).toEqual(expect.arrayContaining([
      expect.objectContaining({ roomId: 'room-2' }),
      expect.objectContaining({ roomId: 'room-2' }),
      expect.objectContaining({ roomId: 'room-2' }),
    ]));
  });
});
