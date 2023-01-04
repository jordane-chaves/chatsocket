import { Server, Socket } from "socket.io";
import { container } from "tsyringe";

import { CreateUserUseCase } from "@application/users/use-cases/create-user/create-user-use-case";
import { ListUsersUseCase } from "@application/users/use-cases/list-users/list-users-use-case";

import { UserViewModel } from "../view-models/user-view-model";

interface CreateUserRequest {
  name: string;
  email: string;
  avatar: string;
}

export function userHandlers(io: Server, socket: Socket) {
  async function createUser (data: CreateUserRequest, callback: Function) {
    const { name, email, avatar } = data;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { user } = await createUserUseCase.execute({
      name,
      email,
      avatar,
      socketId: socket.id,
    });

    socket.broadcast.emit('users:new', UserViewModel.toSocket(user));
    callback({ user: UserViewModel.toSocket(user) });
  }

  async function listUsers(callback: Function) {
    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const { users } = await listUsersUseCase.execute();

    const usersList = users.map(UserViewModel.toSocket);

    callback(usersList);
  }

  socket.on('users:create', createUser);
  socket.on('users:list', listUsers);
}
