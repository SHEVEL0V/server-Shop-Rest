/** @format */

const bcrypt = require("bcrypt");
const makeResponseAuth = require("../../services/user/makeRes");
const User = require("../../db/schema/user");
const RequestError = require("../../helpers/error");

const loginUser = async (req, res, next) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, `No user with email: ${email} found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw RequestError(401, `password:${password} is wrong  `);
  }

  return res.json(makeResponseAuth(user));
};

module.exports = loginUser;
