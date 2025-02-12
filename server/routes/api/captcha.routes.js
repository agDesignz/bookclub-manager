import { Router } from "express";
const router = Router();
import {
  generateChallenge,
  checkSolution,
} from "../../controllers/captcha.contoller.js";

router.get("/challenge", generateChallenge);
router.post("/challenge", checkSolution);

export default router;
