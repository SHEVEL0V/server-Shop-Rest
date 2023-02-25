/** @format */
const Product = require("../../db/schema/product");
const { uploadFile } = require("../../upload");

const addProduct = async function (req, res, next) {
  const { path, filename } = req.file;

  const { mediaLink } = await uploadFile(path, filename);

  const newProduct = new Product({ ...req.body, img: mediaLink });

  await newProduct.save();

  return res.status(200).json(newProduct);
};

module.exports = addProduct;
