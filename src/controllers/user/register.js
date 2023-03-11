/** @format */
const bcrypt = require("bcrypt");
const makeResponseAuth = require("../../services/user/makeRes");
const User = require("../../db/schema/user");

//-------------------------------------------------------------
//-------REGISTER----------------------------------------------

const registerUser = async (req, res, next) => {
  const { password, email } = req.body;

  const passwordBcrypt = await bcrypt.hash(password, 10);

  const user = new User({ ...req.body, password: passwordBcrypt });
  await newUser.save();

  return res.json(makeResponseAuth(user));
};

module.exports = registerUser;
