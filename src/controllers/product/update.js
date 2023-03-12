/** @format */
const Product = require("../../db/schema/product");
const { uploadFile } = require("../../services/upload");

const updateProduct = async function (req, res, next) {
  const { path, filename } = req.file || {};
  const { id } = req.params;
  const options = JSON.parse(req.body.options);

  let img = req.body.img;
  //-------if img is not present in the request body------------------------//
  if (path) {
    //-------upload the image to google cloud storage-----------------------//
    const { mediaLink } = await uploadFile(path, filename);
    img = mediaLink;
  }
  //-------update the product in the database-------------------------------//
  const response = await Product.findByIdAndUpdate(id, {
    ...req.body,
    img,
    options,
  });

  return res.status(200).json(response);
};

module.exports = updateProduct;
