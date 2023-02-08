/** @format */

const Basket = require("../db/schema/basket");
const RequestError = require("../helpers/error");

const getBasket = async function (req, res, next) {
  const data = await Basket.find().populate("product");
  res.status(200).json(data);
};

const addBasket = async function (req, res, next) {
  const newProduct = new Basket(req.body);
  await newProduct.save();
  return res.status(200).json(newProduct);
};

const deleteBasket = async function (req, res, next) {
  const { id } = req.params;

  const response = await Basket.findByIdAndRemove(id);
  if (!response) {
    throw RequestError(404);
  }
  return res.json({ message: "product deleted", response });
};

module.exports = { getBasket, addBasket, deleteBasket };
