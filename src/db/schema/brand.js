/** @format */
/** @format */
const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  id: String,
  name: String,
});

module.exports = mongoose.model("Type", brandSchema);
