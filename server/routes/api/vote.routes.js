const router = require("express").Router();

const { createVote, deleteVote } = require("../../controllers/vote.controller");

const { protect, admin } = require("../../middleware/authMiddleware");

router.post("/", protect, createVote);
router.delete("/", protect, deleteVote);

module.exports = router;
