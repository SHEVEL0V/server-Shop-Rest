/** @format */
const bcrypt = require("bcrypt");
const makeAuthRes = require("../../services/user/makeRes");
const User = require("../../db/schema/user");
const RequestError = require("../../helpers/error");

//-------------------------------------------------------------
//-------REGISTER----------------------------------------------

const registerUser = async (req, res, next) => {
  const { password, email } = req.body;

  //-----Is email already in use?-----//
  const user = await User.findOne({ email });
  if (user) {
    throw new RequestError(400, "User already exists");
  }
  //-----Hash password-----//
  const passwordBcrypt = await bcrypt.hash(password, 10);

  //-----Save user to database-----//
  const newUser = new User({ ...req.body, password: passwordBcrypt });
  await newUser.save();

  return res.json(makeAuthRes(newUser));
};

module.exports = registerUser;
