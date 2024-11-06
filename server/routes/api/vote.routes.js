const router = require("express").Router();

const { createVote } = require("../../controllers/vote.controller");

const { protect, admin } = require("../../middleware/authMiddleware");

router.post("/", protect, createVote);

module.exports = router;
