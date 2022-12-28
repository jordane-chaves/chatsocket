import { Room } from '@application/rooms/entities/room';
import { User } from '@application/users/entities/user';
import { Room as RawRoom } from '../schemas/Room';

export class MongoRoomMapper {
  static toDomain(raw: RawRoom): Room {
    const users = raw.usersIds.map(user => new User({
      avatar: user.avatar,
      email: user.email,
      name: user.name,
      socketId: user.socketId,
    }, user._id));

    return new Room({
      usersIds: raw.usersIds,
      users,
    }, raw.id);
  }
}
