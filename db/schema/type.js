/** @format */
const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  id: String,
  name: String,
});

module.exports = mongoose.model("Type", typeSchema);
