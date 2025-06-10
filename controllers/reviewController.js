const Review = require("../models/Reviews");
const Book = require("../models/Books");

exports.createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    const existingReview = await Review.findOne({
      book: req.params.id,
      user: req.user.userId,
    });
    if (existingReview) {
      return res.status(400).json({ error: "You already reviewed this book" });
    }
    const review = new Review({
      book: req.params.id,
      user: req.user.userId,
      rating,
      comment,
    });
    await review.save();
    book.reviews.push(review._id);
    await book.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: "Error adding review" });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const { rating, comment } = req.body;
    review.rating = rating;
    review.comment = comment;
    await review.save();
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ error: "Error updating review" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review || review.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await review.remove();
    const book = await Book.findById(review.book);
    book.reviews.pull(review._id);
    await book.save();
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting review" });
  }
};
