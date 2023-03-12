/** @format */
const Product = require("../../db/schema/product");

const getProductOptions = async function (req, res, next) {
  //---------find all products---------//
  const products = await Product.find().select({ type: 1, brand: 1 });
  //----------types--------------------------------//
  const type = [...new Set(products.map(({ type }) => type))];
  //----------brands--------------------------------//
  const brand = [...new Set(products.map(({ brand }) => brand))];
  //----------price range--------------------------------//
  const { price: max } = await Product.findOne().sort({ price: -1 });
  const { price: min } = await Product.findOne().sort({ price: 1 });

  res.json({ type, brand, price: [min, max] });
};

module.exports = getProductOptions;
