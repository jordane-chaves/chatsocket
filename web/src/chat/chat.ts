import '../styles/global.css';
import './styles/style.css';
import './styles/header.css';
import './styles/contacts.css';
import './styles/messages.css';
import './styles/theme-button.css';

import '../utils/themeSwitcher';
import { setFakerData } from './faker-data';
import { io } from 'socket.io-client';
import dayjs from 'dayjs';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  socketId: string;
}

interface Room {
  id: string;
  usersIds: string[];
}

interface Message {
  id: string;
  from: string;
  text: string;
  roomId: string;
  createdAt: Date;
}

interface ChatStartMessagesData {
  message: Message;
  user: User;
}

interface ChatStartResponse {
  room: Room;
  messages: ChatStartMessagesData[];
}

interface SendMessageRequest {
  message: Message;
  user: User;
}

interface AddMessageData {
  message: Message;
  user: User;
  userLogged: User;
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
    } else {
      window.location.replace('/');
    }
    return;
  }

  setUserLoggedInfo({ name, avatar })

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
      if (user.email !== email) {
        addToContactList({
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          socketId: user.socketId
        });
      } else {
        userLogged = user;
      }
    });
  });

  socket.on('message:send', async (data: SendMessageRequest) => {
    if (data.message.roomId === roomId) {
      addMessage({
        message: data.message,
        user: data.user,
        userLogged,
      });
    }
  });
};

document.getElementById('contacts_list')!.addEventListener('click', (event) => {
  document
    .querySelectorAll('.contact')
    .forEach(contact => contact.classList.remove('selected'));

  document.getElementById('messages')!.innerHTML = '';

  const clickedElement = event.target as Element | null;

  if (clickedElement && clickedElement.matches('li.contact')) {
    clickedElement.classList.add('selected');

    const userId = clickedElement.getAttribute('data-id-user');

    if (!userId) {
      return;
    }

    socket.emit('chat:start', { userId }, async (response: ChatStartResponse) => {
      const { room, messages } = response;

      roomId = room.id;

      messages.forEach(item => {
        addMessage({
          message: item.message,
          user: item.user,
          userLogged,
        });
      });
    });
  }
});

document.getElementById('user_message')!.addEventListener('keypress', (event) => {
  if (event.target && event.key === 'Enter') {
    const inputMessage = event.target as HTMLInputElement;

    const message = inputMessage.value;

    inputMessage.value = '';

    socket.emit('message:send', { message, roomId });
  }
});

interface UserLoggedInfoData {
  name: string;
  avatar: string;
}

function setUserLoggedInfo(user: UserLoggedInfoData) {
  const userAvatar = document.getElementById('profile_avatar')!;

  userAvatar.setAttribute('src', user.avatar);
  userAvatar.setAttribute('title', user.name);
}

function addToContactList(user: User) {
  const contactsList = document.getElementById('contacts_list')!;

  contactsList.innerHTML += `
  <li
    class="contact"
    id="user_${user.id}"
    data-id-user="${user.id}"
  >
    <img src="${user.avatar}" alt="User Avatar" class="avatar" >

    <div class="info">
      <span class="contact_name">${user.name}</span>
      <span class="last_message"></span>
    </div>
  </li>
  `;
}

function addMessage(data: AddMessageData) {
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
