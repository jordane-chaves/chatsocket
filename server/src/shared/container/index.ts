import { container } from 'tsyringe';

import { UsersRepository } from '@application/users/repositories/users-repository';
import { MongoUsersRepository } from '@shared/infra/database/mongo/repositories/mongo-users-repository';
import { RoomsRepository } from '@application/rooms/repositories/rooms-repository';
import { MongoRoomsRepository } from '@shared/infra/database/mongo/repositories/mongo-rooms-repository';
import { MessagesRepository } from '@application/messages/repositories/messages-repository';
import { MongoMessagesRepository } from '@shared/infra/database/mongo/repositories/mongo-messages-repository';

container.registerSingleton<UsersRepository>(
  'UsersRepository',
  MongoUsersRepository,
);

container.registerSingleton<RoomsRepository>(
  'RoomsRepository',
  MongoRoomsRepository,
);

container.registerSingleton<MessagesRepository>(
  'MessagesRepository',
  MongoMessagesRepository,
);
