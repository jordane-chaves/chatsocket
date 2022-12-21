import { User } from "../../entities/user";
import { UsersRepository } from "../../repositories/users-repository";

interface CreateUserRequest {
  name: string;
  email: string;
  avatar: string;
  socketId: string;
}

interface CreateUserResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

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

    return { user };
  }
}
