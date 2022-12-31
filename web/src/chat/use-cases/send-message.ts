import { Socket } from "socket.io-client";

interface SendMessageData {
  message: string;
  roomId: string;
}

export function sendMessage(
    { message, roomId }: SendMessageData,
    socket: Socket
  ) {
  if (!message || !roomId) {
    return;
  }

  socket.emit('message:send', { message, roomId });
}
