import { mongo } from "mongoose";

import { Room } from "@application/rooms/entities/room";
import { FindRoomData, RoomsRepository } from "@application/rooms/repositories/rooms-repository";

import { MongoRoomMapper } from "../mappers/mongo-room-mapper";
import { Room as MongoRoom } from '../schemas/Room';

export class MongoRoomsRepository implements RoomsRepository {
  async create(room: Room): Promise<void> {
    const usersObjectIds = room.usersIds.map(userId => new mongo.ObjectId(userId));

    await MongoRoom.create({
      id: room.id,
      usersIds: usersObjectIds
    });
  }

  async find({ id, usersIds }: FindRoomData): Promise<Room | null> {
    let room = null;

    if (id) {
      room = await MongoRoom
        .findOne({ id })
        .populate('usersIds')
        .exec();
    } else if (usersIds && usersIds.length > 0) {
      const usersObjectIds = usersIds && usersIds.map(userId => new mongo.ObjectId(userId));

      room = await MongoRoom.findOne({
        usersIds: {
          $all: usersObjectIds
        },
      }).exec();
    }

    return room ? MongoRoomMapper.toDomain(room) : null;
  }
}
