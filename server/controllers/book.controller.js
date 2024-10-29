const Book = require('../models/Book');
const asyncHandler = require('../middleware/asyncHandler');

const tester = () => console.log("Test from book controller");

// @desc Fetch all books
// @route GET /api/books
// @access Public
const getBooks = asyncHandler(async (req, res) => {
  // Follow Brad Traversy's example with page limits
});

// @desc Fetch book by keyword
// @route GET /api/books
// @access Public



module.exports = {}