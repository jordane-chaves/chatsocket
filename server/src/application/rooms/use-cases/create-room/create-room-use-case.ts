import { Room } from "@application/rooms/entities/room";
import { RoomsRepository } from "@application/rooms/repositories/rooms-repository";
import { inject, injectable } from "tsyringe";

interface CreateRoomRequest {
  usersIds: string[];
}

interface CreateRoomResponse {
  room: Room;
}

@injectable()
export class CreateRoomUseCase {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: RoomsRepository
  ) {}

  async execute(request: CreateRoomRequest): Promise<CreateRoomResponse> {
    const { usersIds } = request;

    const room = new Room({ usersIds });

    await this.roomsRepository.create(room);

    return { room };
  }
}
