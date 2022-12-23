import '../styles/global.css';
import './styles/style.css';
import './styles/header.css';
import './styles/contacts.css';
import './styles/messages.css';
import './styles/theme-button.css';

import '../utils/themeSwitcher';
import { setFakerData } from './faker-data';
import { io } from 'socket.io-client';

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

  setUserLoggedInfo({ avatar })

  socket.emit('start', { name, email, avatar });
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
  avatar: string;
}

function setUserLoggedInfo(user: UserLoggedInfoData) {
  const userAvatar = document.getElementById('profile_avatar')!;

  userAvatar.setAttribute('src', user.avatar);
}
