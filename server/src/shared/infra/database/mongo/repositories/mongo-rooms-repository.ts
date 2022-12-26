import { Room } from "@application/rooms/entities/room";
import { FindRoomData, RoomsRepository } from "@application/rooms/repositories/rooms-repository";
import { mongo } from "mongoose";
import { MongoRoomMapper } from "../mappers/mongo-room-mapper";
import { Room as MongoRoom } from '../schemas/Room';

export class MongoRoomsRepository implements RoomsRepository {
  async create(room: Room): Promise<void> {
    await MongoRoom.create({
      id: room.id,
      usersIds: room.usersIds
    });
  }

  async find({ id, usersIds }: FindRoomData): Promise<Room | null> {
    const usersObjectIds = usersIds.map(userId => new mongo.ObjectId(userId));

    const room = await MongoRoom.findOne({
      $or: [
        { id },
        {
          usersIds: {
            $all: usersObjectIds
          }
        }
      ],
    }).exec();

    return room ? MongoRoomMapper.toDomain(room) : null;
  }
}
