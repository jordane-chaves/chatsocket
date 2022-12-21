import { makeUser } from "../../../../../test/factories/user-factory";
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
    await inMemoryUsersRepository.create(makeUser());
    await inMemoryUsersRepository.create(makeUser());
    await inMemoryUsersRepository.create(makeUser());
    await inMemoryUsersRepository.create(makeUser());
    await inMemoryUsersRepository.create(makeUser());

    const { users } = await listUsersUseCase.execute();

    expect(users).toHaveLength(5);
  });
});
