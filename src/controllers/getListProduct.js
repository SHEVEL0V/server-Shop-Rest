/** @format */

const { $where } = require("../db/schema/product");
const Product = require("../db/schema/product");

const getListProduct = async function (req, res, next) {
  const { page = 1, min = 0, max = 100000, type, brand, search } = req.query;

  const priceMin = Number(min);
  const priceMax = Number(max);

  const { price: maxPrice } = await Product.findOne().sort({ price: -1 });
  const count = await Product.count();

  const products = await Product.find({
    price: { $gte: priceMin, $lte: priceMax },
  })
    .find(type ? { type } : null)
    .find(brand ? { brand } : null)
    .find(search ? { name: { $regex: search, $options: "i" } } : null)
    .limit(10);

  res.status(200).json({ products, count, maxPrice });
};

module.exports = { getListProduct };
