/** @format */

const Orders = require("../../db/schema/orders");

const getOrder = async function (req, res, next) {
  const { status, date = undefined } = req?.query;

  const searchStatus = status ? { status } : undefined;

  const DATE = date?.split("-")?.map((e) => Number(e));

  const searchDate = DATE
    ? {
        createdAt: {
          $gte: new Date(DATE[0], DATE[1] - 1, DATE[2]),
          $lte: new Date(DATE[0], DATE[1] - 1, DATE[2] + 1),
        },
      }
    : undefined;

  const data = await Orders.find({ ...searchStatus, ...searchDate }).populate(
    "user"
  );

  res.status(200).json(data);
};

module.exports = getOrder;
