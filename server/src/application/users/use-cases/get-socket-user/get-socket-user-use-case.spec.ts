import { makeUser } from "../../../../../test/factories/user-factory";
import { InMemoryUsersRepository } from "../../../../../test/repositories/in-memory-users-repository";
import { GetSocketUserUseCase } from "./get-socket-user-use-case";

let getSocketUserUseCase: GetSocketUserUseCase;

let inMemoryUsersRepository: InMemoryUsersRepository;

describe('Get Socket User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    getSocketUserUseCase = new GetSocketUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to get user by socket id', async () => {
    await inMemoryUsersRepository.create(
      makeUser({ email: 'user-1@test.com', socketId: 'socket-id-1' }),
    );

    await inMemoryUsersRepository.create(
      makeUser({ email: 'user-2@test.com', socketId: 'socket-id-2' }),
    );

    await inMemoryUsersRepository.create(
      makeUser({ email: 'user-3@test.com', socketId: 'socket-id-3' }),
    );

    const { user } = await getSocketUserUseCase.execute({ socketId: 'socket-id-2' });

    expect(user).toBeTruthy();
    expect(user.email).toEqual('user-2@test.com');
  });
});
