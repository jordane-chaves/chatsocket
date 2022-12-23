import { User } from "../entities/user";

export interface UsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findBySocketId(socketId: string): Promise<User | null>;
  findMany(): Promise<User[]>;
}
