import { Room, RoomProps } from "../../src/application/rooms/entities/room";

type Override = Partial<RoomProps>;

export function makeRoom(override: Override = {}) {
  return new Room({
    usersIds: [ 'example-user-1', 'example-user-2' ],
    ...override,
  });
}
