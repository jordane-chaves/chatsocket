import { Room } from "../../entities/room";
import { RoomsRepository } from "../../repositories/rooms-repository";

interface CreateRoomRequest {
  usersIds: string[];
}

interface CreateRoomResponse {
  room: Room;
}

export class CreateRoomUseCase {
  constructor(private roomsRepository: RoomsRepository) {}

  async execute(request: CreateRoomRequest): Promise<CreateRoomResponse> {
    const { usersIds } = request;

    const room = new Room({ usersIds });

    await this.roomsRepository.create(room);

    return { room };
  }
}
