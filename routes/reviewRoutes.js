const express = require("express");
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/books/:id/reviews", authMiddleware, reviewController.createReview);
router.put("/reviews/:id", authMiddleware, reviewController.updateReview);
router.delete("/reviews/:id", authMiddleware, reviewController.deleteReview);

module.exports = router;
