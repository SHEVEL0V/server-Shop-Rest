/** @format */

const { Product } = require("../db/schema");

const getlist = async (req, res, next) => {
  res = await Product.find({});
};

module.exports = { getlist };
