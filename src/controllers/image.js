/** @format */

const { uploadFile } = require("../upload");

const addImage = async function (req, res, next) {
  const { path, filename } = req.file;
  if (!path) {
    throw RequestError(404, "absent file");
  }

  const { mediaLink } = await uploadFile(path, filename);

  return res.json({ url: mediaLink });
};

module.exports = { addImage };
