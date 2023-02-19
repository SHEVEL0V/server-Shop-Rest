/** @format */
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    img: { type: String, required: true },
    type: { type: String, default: "" },
    brand: { type: String, required: true },
    desc: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("products", productsSchema);
