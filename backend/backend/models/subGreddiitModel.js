const mongoose = require("mongoose");

const subGreddiitSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    moderator: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    followers: [
      {
        type: String,
      },
    ],
    blocked: [
      {
        type: String,
      },
    ],
    pending: [
      {
        type: String,
      },
    ],
    tags: [
      {
        type: String,
      },
    ],
    bannedKeywords: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SubGreddiit", subGreddiitSchema);
