/** @format */
const bcrypt = require("bcrypt");
const User = require("../../db/schema/user");
const { uploadFile } = require("../../services/upload");
const makeResponseAuth = require("../../services/user/makeRes");

const updateUser = async function (req, res, next) {
  const { path, filename } = req.file || {};
  const { id } = req.user;
  const { body } = req;

  let avatarURL = body.picture;

  if (path) {
    const { mediaLink } = await uploadFile(path, filename);
    avatarURL = mediaLink;
  }

  const password = body.password
    ? { password: await bcrypt.hash(body.password, 10) }
    : undefined;

  await User.findByIdAndUpdate(id, {
    $set: { ...body, avatarURL, ...password },
  });

  const user = await User.findById(id);

  return res.json(makeResponseAuth(user));
};

module.exports = updateUser;
