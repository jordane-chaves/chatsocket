import { Room } from "@application/rooms/entities/room";
import { RoomsRepository } from "@application/rooms/repositories/rooms-repository";

interface GetRoomRequest {
  id?: string;
  usersIds?: string[];
}

interface GetRoomResponse {
  room: Room;
}

export class GetRoomUseCase {
  constructor(private roomsRepository: RoomsRepository) {}

  async execute(request: GetRoomRequest): Promise<GetRoomResponse> {
    const { id, usersIds } = request;

    const room = await this.roomsRepository.find({ id, usersIds });

    return { room };
  }
}
