import mongoose, { Document, Schema } from "mongoose";

type Room = Document & {
  id: string;
  usersIds: string[];
}

const RoomSchema = new Schema({
  id: String,
  usersIds: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    }
  ],
});

const Room = mongoose.model<Room>('rooms', RoomSchema);

export { Room };
