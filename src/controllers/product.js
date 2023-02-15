/** @format */

const Product = require("../db/schema/product");

//-----------------------------------------------------------------------
//----------GET----------------------------------------------------------

const getListProduct = async function (req, res, next) {
  const { page = 1, price, type, brand, search } = req.query;

  const count = await Product.count();

  const { price: maxPrice } = await Product.findOne().sort({ price: -1 });
  const { price: minPrice } = await Product.findOne().sort({ price: 1 });

  const min = Number(price?.split("-")[0]) || minPrice;
  const max = Number(price?.split("-")[1]) || maxPrice;

  const products = await Product.find({
    price: { $gte: min, $lte: max },
  })
    .find(type ? { type } : null)
    .find(brand ? { brand } : null)
    .find(search ? { name: { $regex: search, $options: "i" } } : null)
    .limit(10);

  res.json({ products, count, maxPrice, minPrice });
};

//-----------------------------------------------------------------------
//--------GET-BY-ID------------------------------------------------------

const getProductById = async function (req, res, next) {
  const { id } = req.params;

  const products = await Product.findById(id);

  res.json(products);
};

module.exports = { getListProduct, getProductById };
