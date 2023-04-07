/** @format */
const Product = require("../../db/schema/product");
const searchParams = require("../../services/products/searchParams");
const sortParams = require("../../services/products/sortParams");
const filter = require("../../services/products/filter");

const getProductsDesc = async function (req, res, next) {
  // --------find products --------//
  const products = await Product.find();
  //----------find product price min-max ----------//
  const { price: max = 0 } = await Product.findOne().sort({ price: -1 });
  const { price: min = 0 } = await Product.findOne().sort({ price: 1 });

  res.json({
    price: [min, max],
    type: filter.types(products),
    brand: filter.brands(products),
    params: filter.params(products),
  });
};

module.exports = getProductsDesc;
