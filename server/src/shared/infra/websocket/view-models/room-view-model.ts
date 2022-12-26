import { Room } from "@application/rooms/entities/room";

export class RoomViewModel {
  static toSocket(room: Room) {
    return {
      id: room.id,
      usersIds: room.usersIds,
    };
  }
}
