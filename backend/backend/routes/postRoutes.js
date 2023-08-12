const express = require("express");
const router = express.Router();
const { createPost, getPosts } = require("../controllers/postController");
const { protect } = require("../middleware/authMiddleware");

router.post("/createPost", protect, createPost);
router.post("/getPosts", protect, getPosts);

module.exports = router;
