/** @format */
const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  id: String,
  name: String,
  prise: Number,
  rating: Number,
  img: {
    type: String,
    required: [true],
  },
  typeId: String,
  brandId: String,
});

module.exports = mongoose.model("Card", cardSchema);
