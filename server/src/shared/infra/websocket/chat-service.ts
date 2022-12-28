import { container } from 'tsyringe';

import { CreateUserUseCase } from '@application/users/use-cases/create-user/create-user-use-case';
import { ListUsersUseCase } from '@application/users/use-cases/list-users/list-users-use-case';
import { io } from "../http/http";
import { UserViewModel } from './view-models/user-view-model';
import { CreateRoomUseCase } from '@application/rooms/use-cases/create-room/create-room-use-case';
import { GetSocketUserUseCase } from '@application/users/use-cases/get-socket-user/get-socket-user-use-case';
import { RoomViewModel } from './view-models/room-view-model';
import { SendMessageUseCase } from '@application/messages/use-cases/send-message/send-message-use-case';
import { MessageViewModel } from './view-models/message-view-model';
import { GetRoomUseCase } from '@application/rooms/use-cases/get-room/get-room-use-case';
import { ListRoomMessagesUseCase } from '@application/messages/use-cases/list-room-messages/list-room-messages-use-case';

interface StartRequest {
  name: string;
  email: string;
  avatar: string;
}

interface ChatStartRequest {
  userId: string;
}

interface MessageSendRequest {
  message: string;
  roomId: string;
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
    const listRoomMessagesUseCase = container.resolve(ListRoomMessagesUseCase);

    const { user: userLogged } = await getSocketUserUseCase.execute({
      socketId: socket.id
    });

    const { room } = await createRoomUseCase.execute({
      usersIds: [ data.userId, userLogged.id ],
    });

    socket.join(room.id);

    const { messages } = await listRoomMessagesUseCase.execute({ roomId: room.id });

    callback({
      room: RoomViewModel.toSocket(room),
      messages: messages.map(data => {
        const message = MessageViewModel.toSocket(data.message);
        const user = UserViewModel.toSocket(data.user);

        return { message, user };
      }),
    });
  });

  socket.on('message:send', async (data: MessageSendRequest) => {
    const { message: text, roomId } = data;

    const getSocketUserUseCase = container.resolve(GetSocketUserUseCase);
    const getRoomUseCase = container.resolve(GetRoomUseCase);
    const sendMessageUseCase = container.resolve(SendMessageUseCase);

    const { user } = await getSocketUserUseCase.execute({
      socketId: socket.id
    });

    const { room } = await getRoomUseCase.execute({ id: roomId });

    const { message } = await sendMessageUseCase.execute({
      from: user.id,
      roomId: room.id,
      text,
    });

    io.to(room.id).emit('message:send', {
      message: MessageViewModel.toSocket(message),
      user: UserViewModel.toSocket(user),
    });

    const recipientUser = room.users.find(
      roomUser => String(roomUser.id) !== String(user.id)
    );

    io.to(recipientUser.socketId).emit('notification', {
      newMessage: true,
      roomId: room.id,
      from: UserViewModel.toSocket(user),
    });
  });
});
