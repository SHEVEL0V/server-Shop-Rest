/** @format */

const Orders = require("../db/schema/orders");

//-------------------------------------------------------------
//----------GET------------------------------------------------
const getOrder = async function (req, res, next) {
  const data = await Orders.find(req?.query).populate("user");

  res.status(200).json(data);
};
//-------------------------------------------------------------
//----------ADD------------------------------------------------

const addOrder = async function (req, res, next) {
  const { id } = req.user;
  const { orders } = req.body;

  const newProduct = new Orders({ orders, user: id });

  await newProduct.save();

  return res.status(200).json(newProduct);
};
//-------------------------------------------------------------
//-----------UPDATE--------------------------------------------

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
// //-------------------------------------------------------------
// //------------DELETE-------------------------------------------

// const deleteBasket = async function (req, res, next) {
//   const { id } = req.params;

//   const response = await Basket.findByIdAndRemove(id);
//   if (!response) {
//     throw RequestError(404);
//   }
//   return res.json({ message: "product deleted", response });
// };

module.exports = {
  getOrder,
  addOrder,
  updateOrder,
};
