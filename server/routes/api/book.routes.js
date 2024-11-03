const router = require("express").Router();

const { suggestBook, getAllBooks } = require('../../controllers/book.controller');

const { protect, admin } = require('../../middleware/authMiddleware');

router.get('/', protect, getAllBooks);
router.post('/', protect, suggestBook);

module.exports = router;