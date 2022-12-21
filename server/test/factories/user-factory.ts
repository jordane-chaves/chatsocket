import { User, UserProps } from "../../src/application/users/entities/user";

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    name: 'User Test',
    email: 'user@test.com',
    avatar: 'http://avatar.com/user-test',
    socketId: 'example-socket-id',
    ...override,
  });
}
