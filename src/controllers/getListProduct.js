/** @format */

const Product = require("../db/schema/product");

const getListProduct = async function (req, res, next) {
  const data = await Product.find({});
  res.status(200).json({ data });
};

module.exports = { getListProduct };
