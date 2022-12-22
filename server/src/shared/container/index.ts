import { container } from 'tsyringe';

import { UsersRepository } from '@application/users/repositories/users-repository';
import { MongoUsersRepository } from '@shared/infra/database/mongo/repositories/mongo-users-repository';

container.registerSingleton<UsersRepository>(
  'UsersRepository',
  MongoUsersRepository,
);
