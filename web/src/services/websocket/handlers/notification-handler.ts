import { Socket } from "socket.io-client";

import { Message } from "../../../pages/chat/dtos/Message";
import { User } from "../../../pages/chat/dtos/User";
import { addLastMessage } from "../../../pages/chat/utils/add-last-message";
import { AppLocalStorage } from "../../../utils/app-local-storage";

interface NotificationRequest {
  newMessage: boolean;
  roomId: string;
  from: User;
  message: Message;
}

export function notificationHandler(socket: Socket) {
  function onNotification(data: NotificationRequest) {
    const roomId = AppLocalStorage.getRoomId();

    if (data.roomId !== roomId) {
      const user = document.querySelector(`#user_${data.from.id}`);

      user?.querySelector(".avatar")?.insertAdjacentHTML(
        "afterbegin",
        `<div class="notification"></div>`
      );

      addLastMessage({
        message: data.message,
        userId: data.from.id,
      });
    }
  }

  socket.on("notification", onNotification);
}
