const router = require("express").Router();

const {
  getAllMeets,
  getNextMeet,
  createMeeting,
  updateMeeting,
} = require("../../controllers/meeting.controller");

const { protect, admin } = require("../../middleware/authMiddleware");

// Extensions of /api/next
router.get("/", protect, getAllMeets);
router.post("/", protect, admin, createMeeting);
router.put("/", protect, admin, updateMeeting);
router.get("/latest", protect, getNextMeet);

module.exports = router;
