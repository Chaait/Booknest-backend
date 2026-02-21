const User = require("../models/User");

// Add to favorites
const addFavorite = async (req, res) => {
  try {
    const { bookId } = req.body;

    const user = await User.findById(req.user.id);

    if (!user.favorites.includes(bookId)) {
      user.favorites.push(bookId);
      await user.save();
    }

    res.json({ message: "Added to favorites" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get favorites
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from favorites
const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.favorites = user.favorites.filter(
      (book) => book.toString() !== req.params.bookId
    );

    await user.save();

    res.json({ message: "Removed from favorites" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addFavorite, getFavorites, removeFavorite };