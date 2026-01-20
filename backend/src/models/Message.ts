import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMessage extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId;
  content: string;
  timestamp: Date;
}

const MessageSchema = new Schema<IMessage>({
  from: { type: Schema.Types.ObjectId, ref: "User", required: true },
  to: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IMessage>("Message", MessageSchema);
