const Cart = require("../models/Cart");

// Add to cart
const addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    const existingItem = await Cart.findOne({
      user: req.user.id,
      book: bookId
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json(existingItem);
    }

    const cartItem = await Cart.create({
      user: req.user.id,
      book: bookId,
      quantity
    });

    res.status(201).json(cartItem);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id }).populate("book");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from cart
const removeFromCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addToCart, getCart, removeFromCart };