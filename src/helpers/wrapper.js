/** @format */

const wrap = (cntr) => async (req, res, next) => {
  try {
    await cntr(req, res, next);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = wrap;
