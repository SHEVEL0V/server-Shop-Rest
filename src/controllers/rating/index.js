/** @format */

const Rating = require("../../db/schema/rating");
const Product = require("../../db/schema/product");

const addRating = async function (req, res, next) {
  const { id } = req.user;
  const { itemId, rate } = req.body;

  //--------update Rating--------------//
  const RATE = await Rating.findOneAndUpdate(
    { userId: id, itemId },
    { $set: { rate } }
  );
  //--------if Rating does not exist, so create--------------//
  if (!RATE) {
    const newRating = new Rating({ userId: id, itemId, rate });
    await newRating.save();
  }
  //--------all ratings for a specific item--------------//
  const ratingItem = (await Rating.find({ itemId })).map((obj) => obj.rate);

  //--------round rating----------------//
  const ratingItemRound = Math.round(
    ratingItem.reduce((a, b) => a + b, 0) / ratingItem.length
  );
  //--------update product rating----------------//
  const response = await Product.findByIdAndUpdate(itemId, {
    $set: { rating: ratingItemRound },
  });

  res.json(`Rating ${response.name} update`);
};

module.exports = { addRating };
