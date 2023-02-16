/** @format */
const mongoose = require("mongoose");

const basketSchema = new mongoose.Schema(
  {
    user: {
      ref: "user",
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    product: {
      ref: "products",
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    qty: { type: Number, require: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("baskets", basketSchema);
