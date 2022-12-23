import { User } from "@application/users/entities/user";
import { UsersRepository } from "@application/users/repositories/users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User): Promise<void> {
    const userIndex = this.users.findIndex(item => item.id === user.id);

    if (userIndex >= 0) {
      this.users[userIndex] = user;
    } else {
      this.users.push(user);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email);
  }

  async findBySocketId(socketId: string): Promise<User | null> {
    return this.users.find(user => user.socketId === socketId);
  }

  async findMany(): Promise<User[]> {
    return this.users;
  }
}
