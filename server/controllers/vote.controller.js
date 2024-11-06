const Vote = require("../models/Vote");
const asyncHandler = require("../middleware/asyncHandler");

// @desc CREATE Vote
// @route POST /api/vote/
// @access Private
const createVote = asyncHandler(async (req, res) => {
  const { user, book } = req.body;
  console.log("createVote req:", user, book);
  const [vote, created] = await Vote.findOrCreate({
    where: { user_id: user, book_id: book },
  });

  if (!created) {
    return res
      .status(400)
      .json({ error: "You have already cast a vote for this book" });
  }

  if (vote) {
    res.status(201).json({
      user: vote.user_id,
      book: vote.book_id,
    });
  } else {
    res.status(400).json({ error: "Could not process request" });
  }
});

// @desc DELETE Vote
// @route DELETE /api/vote/
// @access Private
const deleteVote = asyncHandler(async (req, res) => {
  const { user, book } = req.body;
  const vote = await Vote.findOne({
    where: { user_id: user, book_id: book },
  });

  if (vote) {
    vote.destroy();
    res.status(201).json("Vote deleted");
  } else {
    res.status(400).json({ error: "Could not process request" });
  }
});

module.exports = { createVote, deleteVote };
