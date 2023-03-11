/** @format */
const User = require("../../db/schema/user");
const { uploadFile } = require("../../services/upload");
const makeResponseAuth = require("../../services/user/makeRes");

const updateUser = async function (req, res, next) {
  const { path, filename } = req.file || {};
  const { id } = req.user;

  let avatarURL = req.body.picture;

  if (path) {
    const { mediaLink } = await uploadFile(path, filename);
    avatarURL = mediaLink;
  }
  await User.findByIdAndUpdate(id, {
    $set: { ...req.body, avatarURL },
  });

  const user = await User.findById(id);

  return res.json(makeResponseAuth(user));
};

module.exports = updateUser;
