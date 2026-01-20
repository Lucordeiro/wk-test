import { Router } from "express";
import passport from "passport";
import { getMessages } from "../controllers/messages.controller";

const router = Router();

router.get(
  "/:otherUserId",
  passport.authenticate("jwt", { session: false }),
  getMessages
);

export default router;
