/** @format */

const Rating = require("../../db/schema/rating");
const Product = require("../../db/schema/product");

//--------ADD------------------------------------------------------------

const addRating = async function (req, res, next) {
  const { id } = req.user;
  const { itemId, rate } = req.body;

  const RATE = await Rating.findOneAndUpdate(
    { userId: id, itemId },
    { $set: { rate } }
  );

  if (!RATE) {
    const newRating = new Rating({ userId: id, itemId, rate });
    await newRating.save();
  }

  const ratingItem = (await Rating.find({ itemId })).map((obj) => obj.rate);

  const ratingItemRound = Math.round(
    ratingItem.reduce((a, b) => a + b, 0) / ratingItem.length
  );

  const response = await Product.findByIdAndUpdate(itemId, {
    $set: { rating: ratingItemRound },
  });

  res.json(`Rating ${response.name} update`);
};

module.exports = { addRating };
