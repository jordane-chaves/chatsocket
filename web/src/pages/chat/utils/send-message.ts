import { Socket } from "socket.io-client";

import { AppLocalStorage } from "../../../utils/app-local-storage";

export function sendMessage(message: string, socket: Socket) {
  const roomId = AppLocalStorage.getRoomId();

  if (!message || !roomId) {
    return;
  }

  socket.emit('message:send', { message, roomId });
}
