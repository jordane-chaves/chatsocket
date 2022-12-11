import { faker } from '@faker-js/faker';

export function setFakerData() {
  const johnDoeFakerImg = faker.image.avatar();

  document
    .querySelector('#contacts_list li:nth-child(2) img')
    ?.setAttribute('src', johnDoeFakerImg);

  document
    .querySelector('#messages_header img')
    ?.setAttribute('src', johnDoeFakerImg);

  document
    .querySelector('header .right .avatar')
    ?.setAttribute('src', faker.image.avatar());

  document
    .querySelector('#contacts_list li:nth-child(1) img')
    ?.setAttribute('src', faker.image.avatar());
}
