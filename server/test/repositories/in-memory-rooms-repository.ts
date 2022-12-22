import { Room } from "../../src/application/rooms/entities/room";
import { FindRoomData, RoomsRepository } from "../../src/application/rooms/repositories/rooms-repository";

export class InMemoryRoomsRepository implements RoomsRepository {
  public rooms: Room[] = [];

  async create(room: Room): Promise<void> {
    this.rooms.push(room);
  }

  async find({ id, usersIds }: FindRoomData): Promise<Room> {
    return this.rooms.find(room => {
      if (id) {
        return room.id === id;
      }

      if (usersIds) {
        return JSON.stringify(room.usersIds) === JSON.stringify(usersIds);
      }
    });
  }
}
