import { Socket } from "socket.io-client";

interface SendMessageData {
  message: string;
  roomId: string;
  socket: Socket;
}

export function sendMessage({ message, roomId, socket }: SendMessageData) {
  if (!message || !roomId) {
    return;
  }

  socket.emit('message:send', { message, roomId });
}
