const router = require("express").Router();

const {
  suggestBook,
  getAllBooks,
  deleteBook,
} = require("../../controllers/book.controller");

const { protect, admin } = require("../../middleware/authMiddleware");

router.get("/", protect, getAllBooks);
router.post("/", protect, suggestBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;
