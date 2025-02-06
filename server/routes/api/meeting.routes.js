import { Router } from "express";
const router = Router();

import {
  getAllMeets,
  getNextMeet,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} from "../../controllers/meeting.controller.js";

import { protect, admin } from "../../middleware/authMiddleware.js";

// Extensions of /api/next
router.get("/", protect, getAllMeets);
router.post("/", protect, admin, createMeeting);
router.put("/", protect, admin, updateMeeting);
router.delete("/", protect, admin, deleteMeeting);
router.get("/latest", protect, getNextMeet);

export default router;
