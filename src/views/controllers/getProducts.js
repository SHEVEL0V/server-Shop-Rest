/** @format */

const { Product } = require("../src/views/db/schema");

const getlist = async (req, res, next) => {
  res = await Product.find({});
};

module.exports = { getlist };
