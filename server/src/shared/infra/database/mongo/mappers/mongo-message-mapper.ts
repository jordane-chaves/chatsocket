import { Message } from '@application/messages/entities/message';
import { User } from '@application/users/entities/user';
import { Replace } from '@core/Replace';
import { User as RawUser } from '../schemas/User';
import { Message as RawMessage } from '../schemas/Message';

interface ToDomainReturn {
  message: Message;
  user: User;
}

export class MongoMessageMapper {
  static toDomain(raw: Replace<RawMessage, { from: RawUser }>): ToDomainReturn {
    const user = new User({
      avatar: raw.from.avatar,
      email: raw.from.email,
      name: raw.from.name,
      socketId: raw.from.socketId,
    }, String(raw.from._id));

    const message = new Message({
      from: user.id,
      roomId: raw.roomId,
      text: raw.text,
      createdAt: raw.createdAt,
    }, raw.id);

    return { message, user };
  }
}
