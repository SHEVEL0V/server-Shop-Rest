/** @format */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../db/schema/user");
const RequestError = require("../helpers/error");

//-------------------------------------------------------------

const registerUser = async function (req, res, next) {
  const { password: pass, name, email } = req.body;

  const password = await bcrypt.hash(pass, 10);

  const newUser = new User({ ...req.body, password });
  await newUser.save();

  const token = jwt.sign({ email }, process.env.JWT_SECRET);

  return res.status(200).json({ newUser, token });
};

module.exports = { registerUser };
