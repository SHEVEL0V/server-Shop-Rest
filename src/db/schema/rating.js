/** @format */
const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },

    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },

    rate: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Ratings", ratingSchema);
