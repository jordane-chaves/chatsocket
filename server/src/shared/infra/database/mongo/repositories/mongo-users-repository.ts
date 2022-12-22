import { User } from "@application/users/entities/user";
import { UsersRepository } from "@application/users/repositories/users-repository";
import { MongoUserMapper } from "../mappers/mongo-user-mapper";
import { User as MongoUser } from '../schemas/User';

export class MongoUsersRepository implements UsersRepository {
  async create(user: User): Promise<void> {
    const userData = MongoUserMapper.toMongo(user);

    await MongoUser.updateOne(
      { _id: user.id },
      { $set: userData },
      { upsert: true },
    );
  }

  async findByEmail(email: string): Promise<User> {
    const user = await MongoUser.findOne({ email });

    return MongoUserMapper.toDomain(user);
  }

  async findBySocketId(socketId: string): Promise<User> {
    const user = await MongoUser.findOne({ socketId });

    return MongoUserMapper.toDomain(user);
  }

  async findMany(): Promise<User[]> {
    const users = await MongoUser.find();

    return users.map(MongoUserMapper.toDomain);
  }
}
