import { Room } from "./room";

describe('Room', () => {
  it('should be able to create room', () => {
    const room = new Room({ usersIds: [ 'id-user-1', 'id-user-2' ] });

    expect(room).toBeTruthy();
  });
});
