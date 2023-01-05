import dayjs from 'dayjs';

import { AppLocalStorage } from '../../../utils/app-local-storage';
import { Message } from '../dtos/Message';

interface AddMessageData {
  message: Message;
}

export function addMessage(data: AddMessageData) {
  const { message } = data;

  const userLoggedId = AppLocalStorage.getUserLogged();

  const messages = document.getElementById('messages')!;
  const divMessage = document.createElement('div');

  const isMessageFromUserLogged = message.user?.id === userLoggedId?.id;

  if (isMessageFromUserLogged) {
    divMessage.classList.add('right');
  }

  divMessage.classList.add('message');

  divMessage.innerHTML += `
    <div class="content">
      <p>${message.text}</p>
    </div>

    <span>${dayjs(message.createdAt).format('HH:mm')}</span>
  `;

  messages.appendChild(divMessage);
}
