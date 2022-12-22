import mongoose, { Document, Schema } from "mongoose";

type Message = Document & {
  from: string;
  text: string;
  roomId: string;
  createdAt: Date;
}

const MessageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  roomId: {
    type: String,
    ref: 'rooms',
  },
  text: String,
  createdAt: Date,
});

const Message = mongoose.model<Message>('messages', MessageSchema);

export { Message };
