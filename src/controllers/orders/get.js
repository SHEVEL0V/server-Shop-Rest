/** @format */

const Orders = require("../../db/schema/orders");

const getOrder = async function (req, res, next) {
  const data = await Orders.find(req?.query).populate("user");

  res.status(200).json(data);
};

module.exports = getOrder;
