/** @format */

const Rating = require("../db/schema/rating");
const RequestError = require("../helpers/error");

//--------GET-BY-ID------------------------------------------------------

const getRatingById = async function (req, res, next) {
  const { id } = req.params;

  const products = await Rating.findById(id, ["-createdAt", "-updatedAt"]);

  res.json(products);
};

//--------ADD------------------------------------------------------------

const addRating = async function (req, res, next) {
  const { id } = req.user;
  const { itemId, rate } = req.body;

  const RATE = await Rating.findOne({ userId: id, itemId });

  if (RATE) {
    throw RequestError(400, "The user has already added a rating");
  }

  const newRating = new Rating({ userId: id, itemId, rate });

  newRating.save();

  const rating = (await Rating.find({ itemId })).map((obj) => obj.rate);

  const response = Math.round(
    rating.reduce((a, b) => a + b, 0) / rating.length
  );

  res.json({ response });
};

module.exports = { addRating, getRatingById };
