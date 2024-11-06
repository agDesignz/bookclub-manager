const { Book, User } = require("../models");

const asyncHandler = require("../middleware/asyncHandler");

// @desc Fetch all books
// @route GET /api/book
// @access Public
const getAllBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Book.findAll({
      include: [
        {
          model: User,
          as: "voters",
          attributes: ["username"],
          through: { attributes: [] }, // Exclude Vote attributes
        },
      ],
    });
    if (books) {
      res.status(200).json(books);
    } else {
      res.status(400).json({ error: "No books found" });
    }
  } catch (err) {
    console.error(err); // Log the actual error message
    res.status(500).json({ error: "Server error" });
  }
});

// @desc Add/Suggest book to db
// @route POST /api/book
// @access Private
const suggestBook = asyncHandler(async (req, res) => {
  const { user, bookTitle, bookAuthor, bookCover, bookDescription, bookKey } =
    req.body;
  const [book, created] = await Book.findOrCreate({
    where: { title: bookTitle, finished: false },
    defaults: {
      title: bookTitle,
      author: bookAuthor,
      cover: bookCover,
      user_ref: user,
      description: bookDescription,
      key: bookKey,
    },
  });

  if (!created) {
    return res.status(409).json({ error: "Book already exists" });
  }

  if (book) {
    res.status(201).json({
      user: book.user_ref,
      title: book.title,
    });
  } else {
    res.status(400).json({ error: "Could not process request" });
  }
});

// @desc Delete book from db
// @route DELETE /api/book/:id
// @access Private
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);
  if (book) {
    book.destroy();
    res.status(201).json(book);
  } else {
    res.status(404);
    throw new Error("Book not found");
  }
});

module.exports = { suggestBook, getAllBooks, deleteBook };
