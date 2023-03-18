/** @format */
const Product = require("../../db/schema/product");
const searchParams = require("../../services/products/searchParams");
const sortParams = require("../../services/products/sortParams");
const filter = require("../../services/products/filter");

const getListProduct = async function (req, res, next) {
  const { query } = req;
  const { limit = 12, page, sort } = req.query;

  const results = await Product
    //----------find product and sort and skip and limit ----------//
    .find(searchParams(query))
    .sort(sortParams(sort))
    .skip(page ? limit * (page - 1) : null)
    .limit(limit);

  //--------count products--------//
  const count = await Product.countDocuments(searchParams(query));

  // --------find products --------//
  const products = await Product.find();
  //----------find product price min-max ----------//
  const { price: max = 0 } = await Product.findOne().sort({ price: -1 });
  const { price: min = 0 } = await Product.findOne().sort({ price: 1 });

  res.json({
    results,
    desc: {
      count,
      price: [min, max],
      type: filter.filterTypes(products),
      brand: filter.filterBrands(products),
      params: filter.filterParams(products),
    },
  });
};

module.exports = getListProduct;
