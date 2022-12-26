import { Room } from "@application/rooms/entities/room";
import { RoomsRepository } from "@application/rooms/repositories/rooms-repository";
import { inject, injectable } from "tsyringe";

interface GetRoomRequest {
  id?: string;
  usersIds?: string[];
}

interface GetRoomResponse {
  room: Room;
}

@injectable()
export class GetRoomUseCase {
  constructor(
    @inject('RoomsRepository')
    private roomsRepository: RoomsRepository
  ) {}

  async execute(request: GetRoomRequest): Promise<GetRoomResponse> {
    const { id, usersIds } = request;

    const room = await this.roomsRepository.find({ id, usersIds });

    return { room };
  }
}
