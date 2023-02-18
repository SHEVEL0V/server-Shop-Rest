/** @format */

const addImage = async function (req, res, next) {
  const { path } = req.file;
  if (!path) {
    throw RequestError(404);
  }
  console.log(req.file);
  return res.status(200).json({ path });
};

module.exports = { addImage };
