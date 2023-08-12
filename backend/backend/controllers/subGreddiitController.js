const asyncHandler = require("express-async-handler");
const SubGreddiit = require("../models/subGreddiitModel");

const createSubGreddiit = asyncHandler(async (req, res) => {
  const { name, description, tags, bannedKeywords } = req.body;

  if (!name) {
    res.status(400).json({
      message: "Please enter the mandatory fields",
    });
  }

  const nameExists = await SubGreddiit.findOne({ name });

  if (nameExists) {
    res.status(400).json({
      message: "SubGreddiit already exits",
    });
  }

  const subGreddiit = await SubGreddiit.create({
    name,
    moderator: req.user,
    description,
    followers: [req.user],
    tags,
    bannedKeywords,
  });

  res.status(201).json({ subGreddiit });
});

const getMySubGreddiits = asyncHandler(async (req, res) => {
  const mySubGreddiits = await SubGreddiit.find({
    moderator: req.user,
  });

  res.status(201).json({ mySubGreddiits });
});

const getSubGreddiits = asyncHandler(async (req, res) => {
  const subGreddiits = await SubGreddiit.find();

  res.status(201).json({ subGreddiits });
});

const getSubGreddiitData = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({
      message: "Please enter SubGreddiit Name",
    });
  } else {
    const subGreddiitData = await SubGreddiit.findOne({ name: name });

    if (!subGreddiitData) {
      res.status(400).json({
        message: `SubGreddiit ${name} doesn't exist`,
      });
    } else {
      res.status(201).json({ subGreddiitData });
    }
  }
});

const deleteSubGreddiit = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const subgreddiit = await SubGreddiit.deleteOne({ name: name });

  res.status(201).json(subgreddiit);
});

module.exports = {
  createSubGreddiit,
  getMySubGreddiits,
  getSubGreddiits,
  getSubGreddiitData,
  deleteSubGreddiit,
};
