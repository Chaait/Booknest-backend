const Book = require("../models/Book");

// Add Book
const addBook = async (req, res) => {
  try {
    const { title, author, description, price, image, category } = req.body;

    const book = await Book.create({
      title,
      author,
      description,
      price,
      image,
      category
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Books
const getBooks = async (req, res) => {
  try {
    const { category, search, sort } = req.query;

    let filter = {};
    let sortOption = {};

    // Category filter
    if (category && category !== "All") {
      filter.category = { $regex: category, $options: "i" };
    }

    // Search filter
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // Sorting
    if (sort === "low") {
      sortOption.price = 1;   // ascending
    } else if (sort === "high") {
      sortOption.price = -1;  // descending
    }

    const books = await Book.find(filter).sort(sortOption);

    res.status(200).json(books);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get Single Book (Details Page)
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.description = req.body.description || book.description;
    book.price = req.body.price || book.price;
    book.image = req.body.image || book.image;
    book.category = req.body.category || book.category;

    const updatedBook = await book.save();

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.deleteOne();

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
};