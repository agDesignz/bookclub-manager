import asyncHandler from "../middleware/asyncHandler.js";

// @desc Fetch Altcha Challenge
// @route GET /api/challenge
// @access Public
const getChallenge = asyncHandler(async (req, res) => {
  try {
    const challenge = await altcha.challenge.json(); // Generate challenge
    res.json(challenge);
  } catch (error) {
    console.error("Altcha Challenge Error:", error);
    res.status(500).json({ error: "Failed to generate challenge" });
  }
});

export { getChallenge };
