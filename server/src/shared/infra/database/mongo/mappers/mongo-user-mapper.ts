import { User } from "@application/users/entities/user";
import { User as RawUser } from '../schemas/User';

export class MongoUserMapper {
  static toMongo(user: User) {
    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      socketId: user.socketId,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        avatar: raw.avatar,
        socketId: raw.socketId,
      },
      raw._id
    );
  }
}
