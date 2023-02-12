/** @format */

const Product = require("../db/schema/product");

const getListProduct = async function (req, res, next) {
  const { page = 1, price = "", type, brand, search } = req.query;

  const count = await Product.count();
  const { price: maxPrice } = await Product.findOne().sort({ price: -1 });
  const { price: minPrice } = await Product.findOne().sort({ price: 1 });

  const min = Number(price.split("-")[0]) || minPrice;
  const max = Number(price.split("-")[1]) || maxPrice;

  const products = await Product.find({
    price: { $gte: min, $lte: max },
  })
    .find(type ? { type } : null)
    .find(brand ? { brand } : null)
    .find(search ? { name: { $regex: search, $options: "i" } } : null)
    .limit(10);

  res.status(200).json({ products, count, maxPrice, minPrice });
};

module.exports = { getListProduct };
