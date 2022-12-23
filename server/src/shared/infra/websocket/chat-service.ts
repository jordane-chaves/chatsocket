import { CreateUserUseCase } from '@application/users/use-cases/create-user/create-user-use-case';
import { container } from 'tsyringe';

import { io } from "../http/http";

interface StartRequest {
  name: string;
  email: string;
  avatar: string;
}

io.on('connect', (socket) => {
  socket.on('start', async (data: StartRequest) => {
    const { name, email, avatar } = data;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      avatar,
      socketId: socket.id,
    });
  });
});
