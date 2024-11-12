const { Meeting, Book } = require("../models");
const asyncHandler = require("../middleware/asyncHandler");

// @desc Fetch all meetings
// @route GET /api/next
// @access Private
const getAllMeets = asyncHandler(async (req, res) => {
  try {
    const meets = await NextMeet.findAll({
      include: Book,
    });
    if (meets) {
      res.status(200).json(meets);
    } else {
      res.status(400).json({ error: "No meetings on file" });
    }
  } catch (error) {
    console.error(error); // Log the actual error message
    res.status(500).json({ error: "Server error" });
  }
});

// @desc Fetch the latest meeting
// @route GET /api/next/latest
// @access Private
const getNextMeet = asyncHandler(async (req, res) => {
  try {
    const nextMeet = await NextMeet.findOne({
      include: Book,
      order: [["id", "DESC"]],
    });
    if (nextMeet) {
      res.status(200).json(nextMeet);
    } else {
      res.status(400).json({ error: "No meetings on file" });
    }
  } catch (error) {
    console.error(error); // Log the actual error message
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = { getAllMeets, getNextMeet };
