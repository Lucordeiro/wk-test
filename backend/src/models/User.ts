import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  status: boolean;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: false, select: true }
});

export default mongoose.model<IUser>("User", UserSchema);
