import dayjs from 'dayjs';

import { Message } from '../dtos/Message';
import { User } from '../dtos/User';

interface AddMessageData {
  message: Message;
  user: User;
  userLogged: User;
}

export function addMessage(data: AddMessageData) {
  const { message, user, userLogged } = data;

  const messages = document.getElementById('messages')!;

  const divMessage = document.createElement('div');

  divMessage.classList.add('message');

  if (user.id === userLogged?.id) {
    divMessage.classList.add('right');
  }

  divMessage.innerHTML += `
    <div class="content">
      <p>${message.text}</p>
    </div>

    <span>${dayjs(message.createdAt).format('HH:mm')}</span>
  `;

  messages.appendChild(divMessage);
}
