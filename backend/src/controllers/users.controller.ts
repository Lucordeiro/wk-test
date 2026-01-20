import { Request, Response } from "express";
import User from "../models/User";

export const getOnlineUsers = async (req: Request, res: Response) => {
  const userId = (req.user as any)._id;
  const users = await User.find(
    { _id: { $ne: userId } },
    "name username online"
  );
  res.json(users);
};
