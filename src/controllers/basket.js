/** @format */

const Basket = require("../db/schema/basket");
const RequestError = require("../helpers/error");

//-------------------------------------------------------------
//----------GET------------------------------------------------
const getBasket = async function (req, res, next) {
  const { query } = req;

  if (!query) {
    throw RequestError(401, "No user params !");
  }

  const data = await Basket.find(query).populate("product");
  res.status(200).json(data);
};
//-------------------------------------------------------------
//----------ADD------------------------------------------------

const addBasket = async function (req, res, next) {
  const newProduct = new Basket(req.body);
  await newProduct.save();
  return res.status(200).json(newProduct);
};
//-------------------------------------------------------------
//-----------UPDATE--------------------------------------------

const updateBasket = async function (req, res, next) {
  const { id } = req.params;

  const response = await Basket.findByIdAndUpdate(id, req.body);
  if (!response) {
    throw RequestError(404);
  }
  return res.status(200).json({ message: "qty update", response });
};
//-------------------------------------------------------------
//------------DELETE-------------------------------------------

const deleteBasket = async function (req, res, next) {
  const { id } = req.params;

  const response = await Basket.findByIdAndRemove(id);
  if (!response) {
    throw RequestError(404);
  }
  return res.json({ message: "product deleted", response });
};

//-------------------------------------------------------------
//------------DELETE ALL---------------------------------------
const deleteBasketAll = async function (req, res, next) {
  const { id } = req.params;

  const response = await Basket.deleteMany({ user: id });

  if (!response) {
    throw RequestError(404);
  }
  return res.json({ message: "basket deleted", response });
};

module.exports = {
  getBasket,
  addBasket,
  deleteBasket,
  updateBasket,
  deleteBasketAll,
};
