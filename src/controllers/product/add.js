/** @format */
const product = require(".");
const Product = require("../../db/schema/product");
const { uploadFile } = require("../../services/upload");

const addProduct = async function (req, res, next) {
  const { path, filename } = req.file;

  const options = JSON.parse(req.body.options);

  const { mediaLink } = await uploadFile(path, filename);

  const newProduct = new Product({ ...req.body, img: mediaLink, options });

  await newProduct.save();

  return res.json({
    message: "Product added successfully",
    product: newProduct,
  });
};

module.exports = addProduct;
