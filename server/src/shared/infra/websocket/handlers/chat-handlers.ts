import { Server, Socket } from "socket.io";
import { container } from "tsyringe";

import { ListRoomMessagesUseCase } from "@application/messages/use-cases/list-room-messages/list-room-messages-use-case";
import { CreateRoomUseCase } from "@application/rooms/use-cases/create-room/create-room-use-case";
import { GetSocketUserUseCase } from "@application/users/use-cases/get-socket-user/get-socket-user-use-case";

import { MessageViewModel } from "../view-models/message-view-model";
import { RoomViewModel } from "../view-models/room-view-model";

interface ChatStartRequest {
  userId: string;
}

export function chatHandlers(io: Server, socket: Socket) {
  async function startChat(data: ChatStartRequest, callback: Function) {
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
      messages: messages.map(MessageViewModel.toSocket),
    });
  }

  socket.on('chat:start', startChat);
}
