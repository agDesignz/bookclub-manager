import { createChallenge, verifySolution } from "altcha-lib";
import asyncHandler from "../middleware/asyncHandler.js";
import "dotenv/config";
const hmacKey = process.env.ALTCHA_HMAC_KEY;

// @desc Fetch Altcha Challenge
// @route GET /api/challenge
// @access Public
const generateChallenge = asyncHandler(async (req, res) => {
  try {
    const challenge = await createChallenge({ hmacKey, maxNumber: 100000 }); // Generate challenge
    res.json(challenge);
  } catch (error) {
    console.error("Altcha Challenge Error:", error);
    res.status(500).json({ error: "Failed to generate challenge" });
  }
});

// @desc Check Altcha Solution
// @route POST /api/challenge
// @access Public
const checkSolution = asyncHandler(async (req, res) => {
  try {
    const ok = await verifySolution(payload, hmacKey);
    if (ok) res.status(200);
  } catch (error) {
    console.error("Altcha Solution Error:", error);
    res.status(500).json({ error: "Solution failed" });
  }
});
export { generateChallenge, checkSolution };
