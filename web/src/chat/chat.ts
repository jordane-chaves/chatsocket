import '../styles/global.css';
import '../styles/scrollbar.css';
import './styles/style.css';
import './styles/header.css';
import './styles/contacts.css';
import './styles/messages.css';
import './styles/theme-button.css';

import { io } from 'socket.io-client';

import '../utils/themeSwitcher';
import { setFakerData } from './faker-data';

import { Message } from './dtos/Message';
import { Room } from './dtos/Room';
import { User } from './dtos/User';

import { setUserLoggedInfo } from './use-cases/set-user-logged-info';
import { addMessage } from './use-cases/add-message';
import { addToContactList } from './use-cases/add-to-contact-list';
import { sendMessage } from './use-cases/send-message';
import { setSelectedUserInfo } from './use-cases/set-selected-user-info';
import { scrollToBottom } from './use-cases/scroll-to-bottom';
import { addMessageDate } from './use-cases/add-message-date';
import { setTypingMessage } from './use-cases/set-typing-message';
import { addLastMessage } from './use-cases/add-last-message';

interface ChatStartResponse {
  room: Room;
  messages: Message[];
}

interface SendMessageRequest {
  message: Message;
  user: User;
}

interface NotificationRequest {
  newMessage: boolean;
  roomId: string;
  from: User;
}

interface LastMessageResponse {
  message: Message | null;
}

const socket = io('http://localhost:3000');

let roomId: string = '';
let userLogged: User;

window.onload = () => {
  const params = new URLSearchParams(window.location.search);

  const name = params.get('name');
  const email = params.get('email');
  const avatar = params.get('avatar');

  if (!name || !email || !avatar) {
    if (import.meta.env.DEV) {
      setFakerData();
      scrollToBottom('messages');
    } else {
      window.location.replace('/');
    }
    return;
  }

  setUserLoggedInfo({ name, avatar });

  socket.emit('start', { name, email, avatar });

  socket.on('users:new', async (user: User) => {
    const userExistsInContactList = document.getElementById(`user_${user.id}`);

    if (!userExistsInContactList) {
      addToContactList({
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        socketId: user.socketId
      });
    }
  });

  socket.emit('users:list', async (users: User[]) => {
    users.map(user => {
      const userExistsInContactList = document.getElementById(`user_${user.id}`);

      if (user.email !== email && !userExistsInContactList) {
        addToContactList({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          socketId: user.socketId
        });

        socket.emit('message:last', { userId: user.id }, (data: LastMessageResponse) => {
          const { message } = data;

          if (message) {
            addLastMessage({ message, userId: user.id });
          }
        });
      } else {
        userLogged = user;
      }
    });
  });

  socket.on('message:send', async (data: SendMessageRequest) => {
    if (data.message.roomId === roomId) {
      const selectedUserId = document
        .querySelector('#contacts_list .selected')
        ?.getAttribute('data-id-user')!;

      const userId = data.message.from === userLogged.id
        ? selectedUserId
        : data.message.from;

      data.message.user = data.user;

      addMessage({
        message: data.message,
        userLogged,
      });

      addLastMessage({
        message: data.message,
        userId,
      });

      scrollToBottom('messages');
    }
  });

  socket.on('notification', (data: NotificationRequest) => {
    if (data.roomId !== roomId) {
      const user = document.querySelector(`#user_${data.from.id} .avatar`);

      user?.insertAdjacentHTML('afterbegin', `
        <div class="notification"></div>
      `);
    }
  });

  socket.on('message:typing', (data) => {
    if (data.typing) {
      setTypingMessage();
    }
  });
};

document.getElementById('contacts_list')!.addEventListener('click', (event) => {
  document
    .querySelectorAll('.contact')
    .forEach(contact => contact.classList.remove('selected'));

  document.getElementById('messages')!.innerHTML = '';
  roomId = '';

  const clickedElement = event.target as Element | null;
  const messagesMain = document.querySelector('.content main')!;

  if (clickedElement && clickedElement.matches('li.contact')) {
    messagesMain.classList.remove('hidden');
    clickedElement.classList.add('selected');

    const userId = clickedElement.getAttribute('data-id-user');
    const userName = clickedElement.querySelector('.info .contact_name')?.innerHTML;
    const userImage = clickedElement.querySelector('.avatar img')?.getAttribute('src');

    if (!userId || !userName || !userImage) {
      return;
    }

    setSelectedUserInfo({ name: userName, avatar: userImage });

    const notification = document.querySelector(`#user_${userId} .notification`);

    if (notification) {
      notification.remove();
    }

    socket.emit('chat:start', { userId }, async (response: ChatStartResponse) => {
      const { room, messages } = response;

      roomId = room.id;

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
          userLogged,
        });
      });

      scrollToBottom('messages');
    });
  } else {
    messagesMain.classList.add('hidden');
  }
});

document.querySelector('main > footer > form')!.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputMessage = document.getElementById('user_message')! as HTMLInputElement;

  const message = inputMessage.value;

  inputMessage.value = '';

  sendMessage({ message, roomId }, socket);
});

document.getElementById('user_message')!.addEventListener('input', (event) => {
  socket.emit('message:typing', { roomId });
});
