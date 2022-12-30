import dayjs from 'dayjs';

import { Message } from '../dtos/Message';
import { User } from '../dtos/User';

interface AddMessageData {
  message: Message;
  userLogged: User;
}

export function addMessage(data: AddMessageData) {
  const { message, userLogged } = data;

  const messages = document.getElementById('messages')!;
  const divMessage = document.createElement('div');

  const isMessageFromUserLogged = message.user?.id === userLogged?.id;

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
