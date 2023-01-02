import { Server, Socket } from "socket.io";
import { container } from "tsyringe";

import { SendMessageUseCase } from "@application/messages/use-cases/send-message/send-message-use-case";
import { GetRoomUseCase } from "@application/rooms/use-cases/get-room/get-room-use-case";
import { GetSocketUserUseCase } from "@application/users/use-cases/get-socket-user/get-socket-user-use-case";

import { MessageViewModel } from "../view-models/message-view-model";
import { UserViewModel } from "../view-models/user-view-model";

interface MessageSendRequest {
  message: string;
  roomId: string;
}

interface MessageTyping {
  roomId: string;
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

  async function messageTyping(data: MessageTyping) {
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

  socket.on('message:send', sendMessage);
  socket.on('message:typing', messageTyping);
}
