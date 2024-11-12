const router = require("express").Router();
const bookRoutes = require("./book.routes");
const meetingRoutes = require("./meeting.routes");
const userRoutes = require("./user.routes");
const voteRoutes = require("./vote.routes");

router.use("/book", bookRoutes);
router.use("/meeting", meetingRoutes);
router.use("/user", userRoutes);
router.use("/vote", voteRoutes);

module.exports = router;
