import { mongo } from 'mongoose';

import { User } from "@application/users/entities/user";
import { UsersRepository } from "@application/users/repositories/users-repository";
import { MongoUserMapper } from "../mappers/mongo-user-mapper";
import { User as MongoUser } from '../schemas/User';

export class MongoUsersRepository implements UsersRepository {
  async create(user: User): Promise<void> {
    const userData = MongoUserMapper.toMongo(user);

    const id = user.id.length > 24
      ? new mongo.ObjectId() :
      new mongo.ObjectId(user.id);

    await MongoUser.updateOne(
      { _id: id },
      { $set: userData },
      { upsert: true },
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await MongoUser.findOne({ email });

    if (!user) {
      return null;
    }

    return MongoUserMapper.toDomain(user);
  }

  async findBySocketId(socketId: string): Promise<User | null> {
    const user = await MongoUser.findOne({ socketId });

    if (!user) {
      return null;
    }

    return MongoUserMapper.toDomain(user);
  }

  async findMany(): Promise<User[]> {
    const users = await MongoUser.find();

    return users.map(MongoUserMapper.toDomain);
  }
}
