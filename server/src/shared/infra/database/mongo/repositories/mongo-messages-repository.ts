import { mongo } from "mongoose";

import { Message } from "@application/messages/entities/message";
import { MessagesRepository } from "@application/messages/repositories/messages-repository";

import { MongoMessageMapper } from "../mappers/mongo-message-mapper";
import { Message as MongoMessage } from '../schemas/Message';

export class MongoMessagesRepository implements MessagesRepository {
  async create(message: Message): Promise<void> {
    const from = new mongo.ObjectId(message.from);

    await MongoMessage.create({
      from,
      text: message.text,
      roomId: message.roomId,
      createdAt: message.createdAt,
    });
  }

  async findManyByRoomId(roomId: string): Promise<Message[]> {
    const messages = await MongoMessage
      .find({ roomId })
      .populate('from')
      .exec();

    return messages && messages.length > 0
      ? messages.map(MongoMessageMapper.toDomain)
      : [];
  }
}
