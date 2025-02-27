import { inject, injectable } from "tsyringe";

import { User } from "@application/users/entities/user";
import { UsersRepository } from "@application/users/repositories/users-repository";

interface CreateUserRequest {
  name: string;
  email: string;
  avatar: string;
  socketId: string;
}

interface CreateUserResponse {
  user: User;
}

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { avatar, email, name, socketId } = request;

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    let user = null;

    if (userAlreadyExists) {
      user = new User({ avatar, email, name, socketId }, userAlreadyExists.id);
    } else {
      user = new User({ avatar, email, name, socketId });
    }

    await this.usersRepository.create(user);

    const createdUser = await this.usersRepository.findByEmail(email);

    return { user: createdUser };
  }
}
