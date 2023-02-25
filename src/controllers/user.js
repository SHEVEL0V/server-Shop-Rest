/** @format */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../db/schema/user");
const RequestError = require("../helpers/error");

//-------------------------------------------------------------
//-------REGISTER----------------------------------------------

const registerUser = async (req, res, next) => {
  const { password, email } = req.body;

  const passwordBcrypt = await bcrypt.hash(password, 10);

  const newUser = new User({ ...req.body, password: passwordBcrypt });
  await newUser.save();

  const id = newUser._id;
  const token = jwt.sign({ id }, process.env.JWT_SECRET);

  return res.json({ token });
};

//-------------------------------------------------------------
//--------LOGIN------------------------------------------------

const loginUser = async (req, res, next) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, `No user with email: ${email} found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw RequestError(401, `password:${password} is wrong  `);
  }

  const { _id: id, role } = user;
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET);

  return res.json({ token, user });
};

module.exports = { registerUser, loginUser };
