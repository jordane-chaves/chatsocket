import { User } from "../../entities/user";
import { UsersRepository } from "../../repositories/users-repository";

interface FindUserRequest {
  socketId: string;
}

interface FindUserResponse {
  user: User;
}

export class FindUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ socketId }: FindUserRequest): Promise<FindUserResponse> {
    const user = await this.usersRepository.findBySocketId(socketId);

    return { user };
  }
}
