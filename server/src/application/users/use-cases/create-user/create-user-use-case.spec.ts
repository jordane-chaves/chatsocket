import { makeUser } from "@test/factories/user-factory";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user-use-case";

let createUserUseCase: CreateUserUseCase;

let inMemoryUsersRepository: InMemoryUsersRepository;

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();

    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const { user } = await createUserUseCase.execute(makeUser());

    expect(inMemoryUsersRepository.users).toHaveLength(1);
    expect(inMemoryUsersRepository.users[0]).toEqual(user);
  });

  it('should be able to update the user if it already exists', async () => {
    await createUserUseCase.execute(makeUser());

    await createUserUseCase.execute(
      makeUser({ socketId: 'another-socket-id' }),
    );

    expect(inMemoryUsersRepository.users).toHaveLength(1);
    expect(inMemoryUsersRepository.users[0].socketId).toEqual(
      'another-socket-id'
    );
  });
});
