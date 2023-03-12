/** @format */
const Product = require("../../db/schema/product");
const searchOptions = require("../../services/products/searchOptions");
const sortOptions = require("../../services/products/sortOptions");

const getListProduct = async function (req, res, next) {
  const { limit = 12, page } = req.query;

  const products = await Product
    // --------find product by options--------//
    .find(searchOptions(req?.query))
    //--------sort by options--------//
    .sort(sortOptions(req?.query?.sort))
    //--------skip and limit--------//
    .skip(page ? limit * (page - 1) : null)
    .limit(limit);

  // --------count products--------//
  const count = await Product.countDocuments(searchOptions(req?.query));

  res.json({ products, count });
};

module.exports = getListProduct;
