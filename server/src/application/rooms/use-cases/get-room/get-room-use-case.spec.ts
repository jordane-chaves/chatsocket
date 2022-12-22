import { makeRoom } from "@test/factories/room-factory";
import { InMemoryRoomsRepository } from "@test/repositories/in-memory-rooms-repository";
import { GetRoomUseCase } from "./get-room-use-case";

let getRoomUseCase: GetRoomUseCase;

let inMemoryRoomsRepository: InMemoryRoomsRepository;

describe('Get Room', () => {
  beforeEach(() => {
    inMemoryRoomsRepository = new InMemoryRoomsRepository();

    getRoomUseCase = new GetRoomUseCase(inMemoryRoomsRepository);
  });

  it('should be able to get room by id', async () => {
    const newRoom = makeRoom();

    await inMemoryRoomsRepository.create(newRoom);

    await inMemoryRoomsRepository.create(makeRoom());
    await inMemoryRoomsRepository.create(makeRoom());

    const { room } = await getRoomUseCase.execute({ id: newRoom.id });

    expect(room).toEqual(newRoom);
  });

  it('should be able to get room by users ids', async () => {
    const newRoom = makeRoom({
      usersIds: [ 'find-user-id-1', 'find-user-id-2' ],
    });

    await inMemoryRoomsRepository.create(newRoom);

    await inMemoryRoomsRepository.create(makeRoom());
    await inMemoryRoomsRepository.create(makeRoom());

    const { room } = await getRoomUseCase.execute({
      usersIds: [ 'find-user-id-1', 'find-user-id-2' ]
    });

    expect(room).toEqual(newRoom);
  });
});
