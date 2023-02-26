/** @format */

const Orders = require("../../db/schema/orders");

const addOrder = async function (req, res, next) {
  const { id } = req.user;
  const { orders } = req.body;

  const newProduct = new Orders({ orders, user: id });

  await newProduct.save();

  return res.status(200).json(newProduct);
};

module.exports = addOrder;
