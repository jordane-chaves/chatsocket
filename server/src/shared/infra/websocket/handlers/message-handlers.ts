import { Server, Socket } from "socket.io";
import { container } from "tsyringe";

import { SendMessageUseCase } from "@application/messages/use-cases/send-message/send-message-use-case";
import { GetRoomUseCase } from "@application/rooms/use-cases/get-room/get-room-use-case";
import { GetSocketUserUseCase } from "@application/users/use-cases/get-socket-user/get-socket-user-use-case";

import { MessageViewModel } from "../view-models/message-view-model";
import { UserViewModel } from "../view-models/user-view-model";
import { GetLastRoomMessageUseCase } from "@application/messages/use-cases/get-last-room-message/get-last-room-message-use-case";

interface MessageSendRequest {
  message: string;
  roomId: string;
}

interface MessageTypingRequest {
  roomId: string;
}

interface MessageLastRequest {
  userId: string;
}

export function messageHandlers(io: Server, socket: Socket) {
  async function sendMessage(data: MessageSendRequest) {
    const { message: text, roomId } = data;

    const getSocketUserUseCase = container.resolve(GetSocketUserUseCase);
    const getRoomUseCase = container.resolve(GetRoomUseCase);
    const sendMessageUseCase = container.resolve(SendMessageUseCase);

    const { user } = await getSocketUserUseCase.execute({
      socketId: socket.id
    });

    if (!user) {
      return;
    }

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
  }

  async function messageTypingRequest(data: MessageTypingRequest) {
    const { roomId } = data;

    const getSocketUserUseCase = container.resolve(GetSocketUserUseCase);
    const getRoomUseCase = container.resolve(GetRoomUseCase);

    const { user } = await getSocketUserUseCase.execute({ socketId: socket.id });
    const { room } = await getRoomUseCase.execute({ id: roomId });

    if (!user) {
      return;
    }

    const recipientUser = room.users.find(
      roomUser => String(roomUser.id) !== String(user.id)
    );

    io.to(recipientUser.socketId).emit('message:typing', { typing: true });
  }

  async function findLastMessage(data: MessageLastRequest, callback: Function) {
    const { userId } = data;

    if (!userId) {
      return;
    }

    const getSocketUserUseCase = container.resolve(GetSocketUserUseCase);
    const getRoomUseCase = container.resolve(GetRoomUseCase);
    const getLastRoomMessageUseCase = container.resolve(
      GetLastRoomMessageUseCase
    );

    const { user: userLogged } = await getSocketUserUseCase.execute({
      socketId: socket.id
    });

    const { room } = await getRoomUseCase.execute({
      usersIds: [ userLogged.id, userId ],
    });

    if (!room) {
      callback({ message: null });
    }

    const { message } = await getLastRoomMessageUseCase.execute({
      roomId: room?.id
    });

    callback({ message: message ? MessageViewModel.toSocket(message) : null });
  }

  socket.on('message:send', sendMessage);
  socket.on('message:typing', messageTypingRequest);
  socket.on('message:last', findLastMessage);
}
