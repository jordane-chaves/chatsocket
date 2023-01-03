import { Message } from "../dtos/Message";

interface AddLastMessageData {
  message: Message;
  userId: string;
}

export function addLastMessage(data: AddLastMessageData) {
  const { message, userId } = data;

  const lastMessage = document.querySelector(`#user_${userId} .last_message`);

  if (lastMessage) {
    lastMessage.innerHTML = message.text;
  }
}
