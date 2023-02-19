/** @format */
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    orders: {
      type: [{}],
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);
