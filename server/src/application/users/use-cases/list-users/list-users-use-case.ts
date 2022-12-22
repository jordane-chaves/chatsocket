import { User } from "@application/users/entities/user";
import { UsersRepository } from "@application/users/repositories/users-repository";

interface ListUsersResponse {
  users: User[];
}

export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<ListUsersResponse> {
    const users = await this.usersRepository.findMany();

    return { users };
  }
}
