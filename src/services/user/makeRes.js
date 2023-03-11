/** @format */

const jwt = require("jsonwebtoken");

const makeResponseAuth = (user) => {
  const { _id: id, role } = user;
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

module.exports = makeResponseAuth;
