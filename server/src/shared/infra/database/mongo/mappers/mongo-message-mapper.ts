import { Message } from '@application/messages/entities/message';
import { User } from '@application/users/entities/user';

import { Message as RawMessage } from '../schemas/Message';
import { User as RawUser } from '../schemas/User';

export class MongoMessageMapper {
  static toDomain(raw: RawMessage): Message {
    let user = null;

    if (raw.from instanceof RawUser) {
      user = new User({
        avatar: raw.from.avatar,
        email: raw.from.email,
        name: raw.from.name,
        socketId: raw.from.socketId,
      }, String(raw.from._id));
    }

    return new Message({
      from: user ? user.id : raw.from,
      roomId: raw.roomId,
      text: raw.text,
      createdAt: raw.createdAt,
      user,
    }, raw.id);
  }
}
