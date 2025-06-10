const Book = require("../models/Books");
const Review = require("../models/Reviews");

exports.createBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body;
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: "Error creating book" });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const filter = {};
    if (author) filter.author = new RegExp(author, "i");
    if (genre) filter.genre = new RegExp(genre, "i");

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Error fetching books" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate({
      path: "reviews",
      populate: { path: "user" },
    });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    let averageRating = 0;
    if (book.reviews.length > 0) {
      averageRating = book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length;
    }
    res.status(200).json({ book, averageRating });
  } catch (err) {
    res.status(500).json({ error: "Error fetching book details" });
  }
};
