const router = require("express").Router();

const {
  getAllMeets,
  getNextMeet,
} = require("../../controllers/meeting.controller");

const { protect, admin } = require("../../middleware/authMiddleware");

// Extensions of /api/next
router.get("/", protect, getAllMeets);
router.get("/latest", protect, getNextMeet);

module.exports = router;
