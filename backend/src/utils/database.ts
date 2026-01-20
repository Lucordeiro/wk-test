import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB error connection :", err);
  }
};

export default connectDatabase;
