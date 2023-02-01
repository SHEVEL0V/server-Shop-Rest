/** @format */
const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  id: String,
  userId: String,
  itemId: String,
  rate: Number,
});

module.exports = mongoose.model("Rating", ratingSchema);
