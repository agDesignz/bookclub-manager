import { Router } from "express";
const router = Router();
import bookRoutes from "./book.routes.js";
import meetingRoutes from "./meeting.routes.js";
import userRoutes from "./user.routes.js";
import voteRoutes from "./vote.routes.js";
import captchaRoutes from "./captcha.routes.js";

router.use("/book", bookRoutes);
router.use("/meeting", meetingRoutes);
router.use("/user", userRoutes);
router.use("/vote", voteRoutes);
router.use("/captcha", captchaRoutes);

export default router;
