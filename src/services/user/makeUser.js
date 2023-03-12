/** @format */

const User = require("../../db/schema/user");

const makeUser = async (data) => {
  const { email, name, email_verified, jti, picture } = data;
  //------create new user------/
  const newUser = new User({
    name,
    password: jti,
    avatarURL: picture,
    email,
    verify: email_verified,
  });
  return await newUser.save();
};

module.exports = makeUser;
