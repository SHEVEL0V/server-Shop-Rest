/** @format */
const mongoose = require("mongoose");

const basketItemSchema = new mongoose.Schema({
  id: String,
  item_id: String,
  basket_id: String,
});

module.exports = mongoose.model("BasketItem", basketItemSchema);
