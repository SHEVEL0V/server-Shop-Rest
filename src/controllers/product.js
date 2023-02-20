/** @format */

const Product = require("../db/schema/product");
const { uploadFile } = require("../upload");

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

//-----------------------------------------------------------------------
//--------ADD------------------------------------------------------------
const addProduct = async function (req, res, next) {
  const { path, filename } = req.file;

  const { mediaLink } = await uploadFile(path, filename);

  const newProduct = new Product({ ...req.body, img: mediaLink });

  await newProduct.save();

  return res.status(200).json(newProduct);
};

//------------DELETE ALL---------------------------------------
const deleteProductsAll = async function (req, res, next) {
  const response = req.body.remove.map(
    async (id) => await Product.findByIdAndDelete(id)
  );

  if (!response) {
    throw RequestError(404);
  }
  return res.json({ message: "products deleted" });
};

module.exports = {
  getListProduct,
  getProductById,
  addProduct,
  deleteProductsAll,
};
