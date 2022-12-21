import { InMemoryUsersRepository } from "../../../../../test/repositories/in-memory-users-repository";
import { User } from "../../entities/user";
import { FindUserUseCase } from "./find-user-use-case";

let findUserUseCase: FindUserUseCase;

let inMemoryUsersRepository: InMemoryUsersRepository;

describe('Find User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    findUserUseCase = new FindUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to find user by socket id', async () => {
    await inMemoryUsersRepository.create(new User({
      avatar: 'https://user-1.test.com',
      email: 'user-1@test.com',
      name: 'User Name Test',
      socketId: 'socket-id-1',
    }));

    await inMemoryUsersRepository.create(new User({
      avatar: 'https://user-2.test.com',
      email: 'user-2@test.com',
      name: 'User Name Test',
      socketId: 'socket-id-2',
    }));

    await inMemoryUsersRepository.create(new User({
      avatar: 'https://user-3.test.com',
      email: 'user-3@test.com',
      name: 'User Name Test',
      socketId: 'socket-id-3',
    }));

    const { user } = await findUserUseCase.execute({ socketId: 'socket-id-2' });

    expect(user).toBeTruthy();
    expect(user.email).toEqual('user-2@test.com');
  });
});
