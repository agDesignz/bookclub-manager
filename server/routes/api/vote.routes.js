import { Router } from "express";
const router = Router();

import { createVote, deleteVote } from "../../controllers/vote.controller.js";

import { protect, admin } from "../../middleware/authMiddleware.js";

router.post("/", protect, createVote);
router.delete("/", protect, deleteVote);

export default router;
