import { Request, Response } from "express";
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, username, password } = req.body;

    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: "Username already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, username, password: hashed });

    res.json({ message: "User registered successfully", user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Credenciais Inválidas" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Credenciais Inválidas" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    user.status = true;
    await user.save();

    res.json({ token, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
