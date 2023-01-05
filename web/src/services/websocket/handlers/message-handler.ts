import { Socket } from "socket.io-client";

import { Message } from "../../../pages/chat/dtos/Message";
import { User } from "../../../pages/chat/dtos/User";
import { addLastMessage } from "../../../pages/chat/utils/add-last-message";
import { addMessage } from "../../../pages/chat/utils/add-message";
import { scrollToBottom } from "../../../pages/chat/utils/scroll-to-bottom";
import { setTypingMessage } from "../../../pages/chat/utils/set-typing-message";
import { AppLocalStorage } from "../../../storage/app-local-storage";

interface SendMessageResponse {
  message: Message;
  user: User;
}

interface MessageTypingResponse {
  typing: boolean;
}

export function messageHandler(socket: Socket) {
  function onSendMessage(data: SendMessageResponse) {
    const roomId = AppLocalStorage.getRoomId();

    if (data.message.roomId === roomId) {
      const selectedUserId = document
        .querySelector("#contacts_list .selected")
        ?.getAttribute("data-id-user")!;

      data.message.user = data.user;

      addMessage({
        message: data.message,
      });

      addLastMessage({
        message: data.message,
        userId: selectedUserId,
      });

      scrollToBottom("messages");
    }
  }

  function onMessageTyping(data: MessageTypingResponse) {
    if (data.typing) {
      setTypingMessage();
    }
  }

  socket.on("message:send", onSendMessage);
  socket.on("message:typing", onMessageTyping);
}
