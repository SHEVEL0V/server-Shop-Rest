/** @format */
const bcrypt = require("bcrypt");
const makeResponseAuth = require("../../services/user/makeRes");
const User = require("../../db/schema/user");
const RequestError = require("../../helpers/error");

//-------------------------------------------------------------
//-------REGISTER----------------------------------------------

const registerUser = async (req, res, next) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new RequestError(400, "User already exists");
  }

  const passwordBcrypt = await bcrypt.hash(password, 10);

  const newUser = new User({ ...req.body, password: passwordBcrypt });
  await newUser.save();

  return res.json(makeResponseAuth(newUser));
};

module.exports = registerUser;
