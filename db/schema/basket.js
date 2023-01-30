/** @format */
const mongoose = require("mongoose");

const basketSchema = new mongoose.Schema({
  id: String,
  user_id: String,
});

module.exports = mongoose.model("Basket", basketSchema);
