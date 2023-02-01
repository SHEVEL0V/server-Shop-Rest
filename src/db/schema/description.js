/** @format */
const mongoose = require("mongoose");

const descSchema = new mongoose.Schema({
  id: String,
  itemId: String,
  title: Number,
  desc: Number,
});

module.exports = mongoose.model("Desc", descSchema);
