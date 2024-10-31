const router = require("express").Router();

const { suggestBook } = require('../../controllers/book.controller');

const { protect, admin } = require('../../middleware/authMiddleware');

router.post('/', protect, suggestBook);

module.exports = router;