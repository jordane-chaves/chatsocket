import '../styles/global.css';
import './styles/style.css';
import './styles/header.css';
import './styles/contacts.css';
import './styles/messages.css';
import './styles/theme-button.css';

import '../utils/themeSwitcher';
import { setFakerData } from './faker-data';
import { io } from 'socket.io-client';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  socketId: string;
}

const socket = io('http://localhost:3000');

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
      }
    });
  });
};

document.getElementById('contacts_list')!.addEventListener('click', (event) => {
  document
    .querySelectorAll('.contact')
    .forEach(contact => contact.classList.remove('selected'));

  const clickedElement = event.target as Element | null;

  if (clickedElement && clickedElement.matches('li.contact')) {
    clickedElement.classList.add('selected');
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
