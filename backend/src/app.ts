import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import connectDatabase from "./utils/database";
import setupPassport from "./config/passport";

import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/users.routes";
import messagesRoutes from "./routes/messages.routes";

dotenv.config();
connectDatabase();

const app = express();
app.use(cors());
app.use(express.json());

setupPassport(passport);
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/messages", messagesRoutes);

export default app;
