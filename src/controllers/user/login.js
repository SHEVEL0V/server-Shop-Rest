/** @format */

const bcrypt = require("bcrypt");
const makeAuthRes = require("../../services/user/makeRes");
const User = require("../../db/schema/user");
const RequestError = require("../../helpers/error");

const loginUser = async (req, res, next) => {
  const { password, email } = req.body;

  //------Is email exist?------//
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, `No user with email: ${email} found`);
  }
  //------Password Validation-----//
  if (!(await bcrypt.compare(password, user.password))) {
    throw RequestError(401, `password:${password} is wrong  `);
  }

  return res.json(makeAuthRes(user));
};

module.exports = loginUser;
