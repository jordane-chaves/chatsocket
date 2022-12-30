import { Room } from '@application/rooms/entities/room';
import { User } from '@application/users/entities/user';

import { Room as RawRoom } from '../schemas/Room';
import { User as RawUser } from '../schemas/User';

export class MongoRoomMapper {
  static toDomain(raw: RawRoom): Room {
    let users = null;
    let usersIds = null;

    if (raw.usersIds instanceof Array<RawUser>) {
      users = raw.usersIds.map(user => new User({
        avatar: user.avatar,
        email: user.email,
        name: user.name,
        socketId: user.socketId,
      }, String(user._id)));

      usersIds = raw.usersIds.map(user => String(user._id));
    }

    return new Room({
      usersIds: usersIds ?? raw.usersIds,
      users,
    }, raw.id);
  }
}
