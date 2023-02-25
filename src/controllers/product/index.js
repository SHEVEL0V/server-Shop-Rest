/** @format */

const addProduct = require("./add");
const deleteProductsAll = require("./delete");
const getListProduct = require("./get");
const getProductById = require("./getById");
const updateProduct = require("./update");

module.exports = {
  getListProduct,
  getProductById,
  addProduct,
  updateProduct,
  deleteProductsAll,
};
