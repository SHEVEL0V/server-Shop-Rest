/** @format */

const makeResponseAuth = require("../../services/user/makeRes");
const User = require("../../db/schema/user");
const RequestError = require("../../helpers/error");
const verifyToken = require("../../services/verifyToken");

const authGoogle = async (req, res, next) => {
  const { token } = req.body;

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

  return res.json(makeResponseAuth(user));
};

module.exports = authGoogle;
