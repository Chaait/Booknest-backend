const express = require("express");
const router = express.Router();

const {
  addBook,
  getBooks,
  getBookById,
  getCategories,
  updateBook,
  deleteBook
} = require("../controllers/bookController");

const { protect,adminOnly } = require("../middleware/authMiddleware");

// Public routes
router.get("/categories", getCategories);
router.get("/", getBooks);
router.get("/:id", getBookById);

// Protected routes (login required)
router.post("/", protect, adminOnly, addBook);
router.put("/:id", protect, adminOnly, updateBook);
router.delete("/:id", protect, adminOnly, deleteBook);

module.exports = router;