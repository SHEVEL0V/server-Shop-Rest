/** @format */
const Product = require("../../db/schema/product");

const getProductById = async function (req, res, next) {
  const { id } = req.params;

  //----------find product by id----------//
  const products = await Product.findById(id, ["-createdAt", "-updatedAt"]);

  res.json(products);
};

module.exports = getProductById;
