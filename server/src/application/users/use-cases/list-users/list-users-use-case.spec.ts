import { InMemoryUsersRepository } from "../../../../../test/repositories/in-memory-users-repository";
import { User } from "../../entities/user";
import { ListUsersUseCase } from "./list-users-use-case";

let listUsersUseCase: ListUsersUseCase;

let inMemoryUsersRepository: InMemoryUsersRepository;

describe('List Users', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    listUsersUseCase = new ListUsersUseCase(inMemoryUsersRepository);
  });

  it('should be able to list all users', async () => {
    await inMemoryUsersRepository.create(new User({
      name: 'User 1',
      avatar: 'avatar-user-1',
      email: 'user-1@test.com',
      socketId: 'example-socket-id',
    }));

    await inMemoryUsersRepository.create(new User({
      name: 'User 2',
      avatar: 'avatar-user-2',
      email: 'user-2@test.com',
      socketId: 'example-socket-id',
    }));

    const { users } = await listUsersUseCase.execute();

    expect(users).toHaveLength(2);
  });
});
