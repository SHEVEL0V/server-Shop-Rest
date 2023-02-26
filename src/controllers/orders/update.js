/** @format */

const Orders = require("../../db/schema/orders");

const updateOrder = async function (req, res, next) {
  const { status, options } = req.body;

  if (!options || !status) {
    throw RequestError(404, "Missing parameters ");
  }

  const response = options.map(
    async (id) => await Orders.findByIdAndUpdate(id, { $set: { status } })
  );

  return res.status(200).json({ message: "Status update", response });
};

module.exports = updateOrder;
