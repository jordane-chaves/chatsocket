import { Room } from '@application/rooms/entities/room';
import { Room as RawRoom } from '../schemas/Room';

export class MongoRoomMapper {
  static toDomain(raw: RawRoom): Room {
    return new Room({
      usersIds: raw.usersIds
    }, raw.id);
  }
}
