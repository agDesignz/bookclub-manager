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
// @route GET /api/book
// @access Public

// @desc Add/Suggest book to db
// @route POST /api/book
// @access Private
const suggestBook = asyncHandler(async (req, res) => {
  const { user, bookTitle, bookAuthor, bookCover } = req.body
  const [book, created] = await Book.findOrCreate({
    where: { title: bookTitle, finished: false },
    defaults: {
      title: bookTitle,
      author: bookAuthor,
      cover: bookCover,
      user_ref: user
    }
  });

  if (!created) {
    return res.status(409).json({ error: 'Book already exists' });
  }

  if (book) {
    res.status(201).json({
      user: book.user_ref,
      title: book.title
    });
  } else {
    res.status(400).json({ error: 'Could not process request' });
  }
});


module.exports = { suggestBook }