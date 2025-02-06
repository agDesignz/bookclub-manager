import { Router } from "express";
const router = Router();

import {
  userLogin,
  userRegister,
  logoutUser,
  authCheck,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../../controllers/user.controller.js";

import { protect, admin } from "../../middleware/authMiddleware.js";

router.get("/auth", authCheck);
router.post("/", userRegister);
router.put("/", protect, updateUserProfile);
router.post("/login", userLogin);
router.post("/logout", logoutUser);
router.get("/profile", getUserProfile);

router.get("/", protect, admin, getUsers);
router.get("/:id", protect, admin, getUserById);
router.delete("/:id", protect, admin, deleteUser);
router.put("/:id", protect, admin, updateUser);

export default router;
