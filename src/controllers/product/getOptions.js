/** @format */
const Product = require("../../db/schema/product");

const getProductOptions = async function (req, res, next) {
  const products = await Product.find().select({ type: 1, brand: 1 });

  const type = [...new Set(products.map(({ type }) => type))];
  const brand = [...new Set(products.map(({ brand }) => brand))];

  const { price: max } = await Product.findOne().sort({ price: -1 });
  const { price: min } = await Product.findOne().sort({ price: 1 });

  res.json({ type, brand, price: [min, max] });
};

module.exports = getProductOptions;
