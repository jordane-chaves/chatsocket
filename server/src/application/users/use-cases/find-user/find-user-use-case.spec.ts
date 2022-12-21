import { makeUser } from "../../../../../test/factories/user-factory";
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
    await inMemoryUsersRepository.create(
      makeUser({ email: 'user-1@test.com', socketId: 'socket-id-1' }),
    );

    await inMemoryUsersRepository.create(
      makeUser({ email: 'user-2@test.com', socketId: 'socket-id-2' }),
    );

    await inMemoryUsersRepository.create(
      makeUser({ email: 'user-3@test.com', socketId: 'socket-id-3' }),
    );

    const { user } = await findUserUseCase.execute({ socketId: 'socket-id-2' });

    expect(user).toBeTruthy();
    expect(user.email).toEqual('user-2@test.com');
  });
});
