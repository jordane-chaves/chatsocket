import { Socket } from "socket.io-client";

import { Message } from "../../../pages/chat/dtos/Message";
import { Room } from "../../../pages/chat/dtos/Room";
import { addMessagesAndDate } from "../../../pages/chat/utils/add-messages-and-date";
import { scrollToBottom } from "../../../pages/chat/utils/scroll-to-bottom";
import { AppLocalStorage } from "../../../storage/app-local-storage";

interface ChatHandlerRequest {
  socket: Socket;
  userId: string;
}

interface ChatStartResponse {
  room: Room;
  messages: Message[];
}

export function chatHandler(data: ChatHandlerRequest) {
  const { socket, userId } = data;

  function startChatCallback(response: ChatStartResponse) {
    const { room, messages } = response;

    AppLocalStorage.setRoomId(room.id);

    addMessagesAndDate({ messages });
    scrollToBottom("messages");
  }

  socket.emit("chat:start", { userId }, startChatCallback);
}
