import { User } from "./user";

describe('User', () => {
  it('should be able to create a user', () => {
    const user = new User({
      name: 'Example User Name',
      avatar: 'example-user-avatar',
      email: 'user@example.com',
      socketId: 'example-socket-id',
    });

    expect(user).toBeTruthy();
  })
});
