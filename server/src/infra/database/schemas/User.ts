import mongoose, { Document, Schema } from "mongoose";

type User = Document & {
  name: string;
  email: string;
  avatar: string;
  socketId: string;
}

const UserSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  socketId: String,
});

const User = mongoose.model<User>('users', UserSchema);

export { User };
