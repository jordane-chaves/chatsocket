import { makeRoom } from "../../../../../test/factories/room-factory";
import { InMemoryRoomsRepository } from "../../../../../test/repositories/in-memory-rooms-repository";
import { CreateRoomUseCase } from "./create-room-use-case";

let createRoomUseCase: CreateRoomUseCase;

let inMemoryRoomsRepository: InMemoryRoomsRepository;

describe('Create Room', () => {
  beforeEach(() => {
    inMemoryRoomsRepository = new InMemoryRoomsRepository();

    createRoomUseCase = new CreateRoomUseCase(inMemoryRoomsRepository);
  });

  it('should be able to create a new room', async () => {
    await createRoomUseCase.execute(makeRoom());

    expect(inMemoryRoomsRepository.rooms).toHaveLength(1);
  });
});
