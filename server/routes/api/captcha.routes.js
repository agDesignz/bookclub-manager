import { Router } from "express";
const router = Router();
import { getChallenge } from "../../controllers/captcha.contoller.js";

router.get("/challenge", getChallenge);

export default router;
