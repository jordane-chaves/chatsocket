import { Room } from "../entities/room";

export interface FindRoomData {
  id?: string;
  usersIds?: string[];
}

export interface RoomsRepository {
  create(room: Room): Promise<void>;
  find(data: FindRoomData): Promise<Room | null>;
}
