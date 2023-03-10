/** @format */

const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const User = require("../../db/schema/user");
const RequestError = require("../../helpers/error");
const { verifyToken } = require("../../services/auth");

const loginGoogle = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    throw RequestError(401, "No token provided");
  }

  const decodeToken = await verifyToken(token);

  const { email, name, email_verified, jti, picture } = decodeToken;

  let user = await User.findOne({ email });

  if (!user) {
    const newUser = new User({
      name,
      password: jti,
      avatarURL: picture,
      email,
      verify: email_verified,
    });
    user = await newUser.save();
  }

  const { _id: id, role } = user;

  const TOKEN = jwt.sign({ id, role }, process.env.JWT_SECRET);

  return res.json({ user, token: TOKEN });
};

module.exports = loginGoogle;
