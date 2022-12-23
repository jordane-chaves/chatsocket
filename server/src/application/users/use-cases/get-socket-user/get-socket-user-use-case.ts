import { User } from "@application/users/entities/user";
import { UsersRepository } from "@application/users/repositories/users-repository";
import { inject, injectable } from "tsyringe";

interface GetSocketUserRequest {
  socketId: string;
}

interface GetSocketUserResponse {
  user: User;
}

@injectable()
export class GetSocketUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute(request: GetSocketUserRequest): Promise<GetSocketUserResponse> {
    const { socketId } = request;

    const user = await this.usersRepository.findBySocketId(socketId);

    return { user };
  }
}
