// const router from "express").Router();
import { Router } from "express";
const router = Router();

import {
  suggestBook,
  getAllBooks,
  deleteBook,
} from "../../controllers/book.controller.js";

import { protect, admin } from "../../middleware/authMiddleware.js";

router.get("/", protect, getAllBooks);
router.post("/", protect, suggestBook);
router.delete("/:id", protect, deleteBook);

export default router;
