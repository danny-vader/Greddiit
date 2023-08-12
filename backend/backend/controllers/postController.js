const asyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

const createPost = asyncHandler(async (req, res) => {
  const { text, postedIn } = req.body;

  if (!text || !postedIn) {
    res.status(400).json({
      message: "Required details not entered",
    });
  } else {
    const post = await Post.create({
      text,
      postedBy: req.user,
      postedIn,
    });

    res.status(201).json({ post });
  }
});

const getPosts = asyncHandler(async (req, res) => {
  const { postedIn } = req.body;

  const posts = await Post.find({
    postedIn: postedIn,
  });

  res.status(201).json({ posts });
});

// const upvotePost = asyncHandler(async (req, res) => {
//   const { id, postedBy } = req.body;
// });

module.exports = {
  createPost,
  getPosts,
};
