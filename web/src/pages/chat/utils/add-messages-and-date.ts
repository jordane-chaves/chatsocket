import { Message } from "../dtos/Message";
import { addMessage } from "./add-message";
import { addMessageDate } from "./add-message-date";

interface AddMessagesAndDateRequest {
  messages: Message[];
}

export function addMessagesAndDate(data: AddMessagesAndDateRequest) {
  const { messages } = data;

  messages.forEach(message => {
    const previousMessage = messages[
      messages.findIndex(messageInList => messageInList === message) -1
    ];

    if (previousMessage) {
      const previousMessageDay = new Date(previousMessage.createdAt).getDay();
      const currentMessageDay = new Date(message.createdAt).getDay();

      if (previousMessageDay !== currentMessageDay) {
        addMessageDate({ date: message.createdAt });
      }
    } else {
      addMessageDate({ date: message.createdAt });
    }

    addMessage({
      message,
    });
  });
}
