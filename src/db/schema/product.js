/** @format */
const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0 },
    img: {
      type: String,
      default:
        "https://support.bluejeans.com/servlet/rtaImage?eid=ka14W000000KNki&feoid=00N44000006xJka&refid=0EM2R000000h4fm",
    },
    type: { type: String, default: "" },
    brand: { type: String, required: true },
    desc: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("products", productsSchema);
