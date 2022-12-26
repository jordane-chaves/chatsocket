import { container } from 'tsyringe';

import { CreateUserUseCase } from '@application/users/use-cases/create-user/create-user-use-case';
import { ListUsersUseCase } from '@application/users/use-cases/list-users/list-users-use-case';
import { io } from "../http/http";
import { UserViewModel } from './view-models/user-view-model';
import { CreateRoomUseCase } from '@application/rooms/use-cases/create-room/create-room-use-case';
import { GetSocketUserUseCase } from '@application/users/use-cases/get-socket-user/get-socket-user-use-case';
import { RoomViewModel } from './view-models/room-view-model';

interface StartRequest {
  name: string;
  email: string;
  avatar: string;
}

interface ChatStartRequest {
  userId: string;
}

io.on('connect', (socket) => {
  socket.on('start', async (data: StartRequest) => {
    const { name, email, avatar } = data;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const { user } = await createUserUseCase.execute({
      name,
      email,
      avatar,
      socketId: socket.id,
    });

    socket.broadcast.emit('users:new', UserViewModel.toSocket(user));
  });

  socket.on('users:list', async (callback: Function) => {
    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const { users } = await listUsersUseCase.execute();

    const usersList = users.map(UserViewModel.toSocket);

    callback(usersList);
  });

  socket.on('chat:start', async (data: ChatStartRequest, callback) => {
    const getSocketUserUseCase = container.resolve(GetSocketUserUseCase);
    const createRoomUseCase = container.resolve(CreateRoomUseCase);

    const { user: userLogged } = await getSocketUserUseCase.execute({
      socketId: socket.id
    });

    const { room } = await createRoomUseCase.execute({
      usersIds: [ data.userId, userLogged.id ],
    });

    callback(RoomViewModel.toSocket(room));
  });
});
