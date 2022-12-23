import { User } from "@application/users/entities/user";
import { UsersRepository } from "@application/users/repositories/users-repository";
import { inject, injectable } from "tsyringe";

interface ListUsersResponse {
  users: User[];
}

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute(): Promise<ListUsersResponse> {
    const users = await this.usersRepository.findMany();

    return { users };
  }
}
