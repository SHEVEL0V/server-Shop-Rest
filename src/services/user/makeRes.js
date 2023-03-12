/** @format */

const jwt = require("jsonwebtoken");

const makeAuthRes = (user) => {
  const { _id: id, role } = user;

  //------CREATING JWT TOKEN------//
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET);

  return {
    user: {
      name: user.name,
      email: user.email,
      telephone: user.telephone,
      picture: user.avatarURL,
      delivery: user.delivery,
      role,
    },
    token,
  };
};

module.exports = makeAuthRes;
