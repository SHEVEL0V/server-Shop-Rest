/** @format */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../db/schema/user");
const RequestError = require("../helpers/error");

//-------------------------------------------------------------
//-------REGISTER----------------------------------------------

const registerUser = async (req, res, next) => {
  const { password: pass, email, _id: id } = req.body;

  const password = await bcrypt.hash(pass, 10);

  const newUser = new User({ ...req.body, password });
  await newUser.save();

  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  return res.json({ user: newUser._id, token });
};

//-------------------------------------------------------------
//--------LOGIN------------------------------------------------

const loginUser = async (req, res, next) => {
  const { password, email, _id: id } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, `No user with email: ${email} found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw RequestError(401, `password:${password} is wrong  `);
  }
  const token = jwt.sign({ email, id }, process.env.JWT_SECRET);

  return res.json({ user: user._id, token });
};

module.exports = { registerUser, loginUser };
