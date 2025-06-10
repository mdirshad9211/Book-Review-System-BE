const express = require("express");
const bookController = require("../controllers/bookController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/books", authMiddleware, bookController.createBook);
router.get("/books", bookController.getAllBooks);
router.get("/books/:id", bookController.getBookById);

module.exports = router;
