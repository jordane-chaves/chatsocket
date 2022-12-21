import { User } from "../entities/user";

export interface UsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findBySocketId(socketId: string): Promise<User>;
  findMany(): Promise<User[]>;
}
