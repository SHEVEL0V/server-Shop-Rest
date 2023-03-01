/** @format */
const Product = require("../../db/schema/product");

const getListProduct = async function (req, res, next) {
  const { limit = 9, page = null, price = null, search = null } = req.query;

  const count = await Product.count();

  const brand = req.query.brand?.split("-") || null;
  const type = req.query.type?.split("-") || null;
  const min = Number(price?.split("-")[0]);
  const max = Number(price?.split("-")[1]);

  console.log(type);

  const products = await Product.find(type && { type: { $in: type } })
    .find(brand && { brand: { $in: brand } })
    .find(price && { price: { $gte: min, $lte: max } })
    .find(search && { name: { $regex: search, $options: "i" } })
    .skip(page && limit * (page - 1))
    .limit(limit);

  res.json({ products, count });
};

module.exports = getListProduct;
