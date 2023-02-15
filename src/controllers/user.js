/** @format */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../db/schema/user");
const RequestError = require("../helpers/error");

//-------------------------------------------------------------

const registerUser = async (req, res, next) => {
  const { password: pass, name, email } = req.body;

  const password = await bcrypt.hash(pass, 10);

  const newUser = new User({ ...req.body, password });
  await newUser.save();

  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  return res.json({ newUser, token });
};

//-------------------------------------------------------------

const loginUser = async (req, res, next) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, `No user with email: ${email} found`);
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw RequestError(401, `password:${password} is wrong  `);
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  return res.json({ user, token });
};

module.exports = { registerUser, loginUser };
