import { User } from "@application/users/entities/user";
import { UsersRepository } from "@application/users/repositories/users-repository";

interface GetSocketUserRequest {
  socketId: string;
}

interface GetSocketUserResponse {
  user: User;
}

export class GetSocketUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: GetSocketUserRequest): Promise<GetSocketUserResponse> {
    const { socketId } = request;

    const user = await this.usersRepository.findBySocketId(socketId);

    return { user };
  }
}
