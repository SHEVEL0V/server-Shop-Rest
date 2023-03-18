/** @format */
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    img: { type: String, required: true },
    type: { type: String, required: [true, "field 'type' is required"] },
    brand: { type: String, required: [true, "field 'brand' is required"] },
    desc: { type: String, default: "" },
    params: [
      {
        name: String,
        value: String,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

productsSchema.virtual("allTypes");

module.exports = mongoose.model("products", productsSchema);
