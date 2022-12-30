import { faker } from '@faker-js/faker';

import { addToContactList } from './use-cases/add-to-contact-list';
import { addMessage } from './use-cases/add-message';

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

  const messagesNumber = 10;

  for (let i = 0; i < messagesNumber; i++) {
    addMessage({
      message: {
        id: faker.datatype.uuid(),
        text: faker.lorem.sentences(),
        from: faker.datatype.uuid(),
        roomId: faker.datatype.uuid(),
        createdAt: new Date(),
        user: {
          id: faker.datatype.uuid(),
          name: faker.name.firstName(),
          avatar: faker.image.avatar(),
          email: faker.internet.email(),
          socketId: faker.datatype.uuid(),
        },
      },
      userLogged: {
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        socketId: faker.datatype.uuid(),
      }
    });
  }
}
