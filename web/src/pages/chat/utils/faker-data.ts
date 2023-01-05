import { faker } from '@faker-js/faker';

import { addToContactList } from './add-to-contact-list';
import { addMessage } from './add-message';
import { AppLocalStorage } from '../../../utils/app-local-storage';

export function setFakerData() {
  setUsersInfos();
  setMessages();
}

function setUsersInfos() {
  const numberOfContacts = 20;

  for (let i = 0; i < numberOfContacts; i++) {
    addToContactList({
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
      socketId: faker.datatype.uuid(),
    });
  }

  document
    .querySelector('header .right .avatar')
    ?.setAttribute('src', faker.image.avatar());
}

function setMessages() {
  const messages = document.querySelector('.content main')!;
  messages.classList.remove('hidden');

  const users = [
    {
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
      socketId: faker.datatype.uuid(),
    },
    {
      id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
      socketId: faker.datatype.uuid(),
    }
  ];

  const userLogged = users[0];

  AppLocalStorage.setUserLogged(userLogged);

  const quantityMessages = 10;

  for (let i = 0; i < quantityMessages / users.length; i++) {
    addMessage({
      message: {
        id: faker.datatype.uuid(),
        text: faker.lorem.sentences(),
        from: faker.datatype.uuid(),
        roomId: faker.datatype.uuid(),
        createdAt: new Date(),
        user: users[0],
      }
    });

    addMessage({
      message: {
        id: faker.datatype.uuid(),
        text: faker.lorem.sentences(),
        from: faker.datatype.uuid(),
        roomId: faker.datatype.uuid(),
        createdAt: new Date(),
        user: userLogged,
      }
    });
  }
}
