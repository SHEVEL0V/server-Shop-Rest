/** @format */
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../db/schema/user");

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

module.exports = registerUser;
