import { Router } from "express";
import passport from "passport";
import { getOnlineUsers } from "../controllers/users.controller";

const router = Router();

router.get(
  "/online",
  passport.authenticate("jwt", { session: false }),
  getOnlineUsers
);

export default router;
