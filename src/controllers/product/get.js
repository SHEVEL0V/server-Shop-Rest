/** @format */
const Product = require("../../db/schema/product");

const getListProduct = async function (req, res, next) {
  const { limit = 10, page, price, type, brand, search } = req.query;

  const count = await Product.count();

  const { price: maxPrice } = await Product.findOne().sort({ price: -1 });
  const { price: minPrice } = await Product.findOne().sort({ price: 1 });

  const min = Number(price?.split("-")[0]) || minPrice;
  const max = Number(price?.split("-")[1]) || maxPrice;

  const products = await Product.find(
    {
      price: { $gte: min, $lte: max },
    },
    ["-createdAt", "-updatedAt "]
  )
    .find(type ? { type } : null)
    .find(brand ? { brand } : null)
    .find(search ? { name: { $regex: search, $options: "i" } } : null)
    .limit(limit)
    .skip(page ? limit * (page - 1) : null);

  res.json({ products, count, maxPrice, minPrice });
};

module.exports = getListProduct;
