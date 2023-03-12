/** @format */
const bcrypt = require("bcrypt");
const User = require("../../db/schema/user");
const { uploadFile } = require("../../services/upload");
const makeAuthRes = require("../../services/user/makeRes");

const updateUser = async function (req, res, next) {
  const { path, filename } = req.file || {};
  const { id } = req.user;
  const { body } = req;

  let avatarURL = body.picture;

  // -----Upload avatar-----//
  if (path) {
    const { mediaLink } = await uploadFile(path, filename);
    avatarURL = mediaLink;
  }

  // -----Password hash-----//
  const password = body.password
    ? { password: await bcrypt.hash(body.password, 10) }
    : undefined;

  // -----Update User -----//
  await User.findByIdAndUpdate(id, {
    $set: { ...body, avatarURL, ...password },
  });
  // -----Fin Update User -----//
  const user = await User.findById(id);

  return res.json(makeAuthRes(user));
};

module.exports = updateUser;
