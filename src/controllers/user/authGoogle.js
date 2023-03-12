/** @format */

const makeAuthRes = require("../../services/user/makeRes");
const User = require("../../db/schema/user");
const RequestError = require("../../helpers/error");
const verifyToken = require("../../services/verifyToken");
const makeUser = require("../../services/user/makeUser");

const authGoogle = async (req, res, next) => {
  const { token } = req.body;

  //------Verify Token------//
  const decodeToken = await verifyToken(token);

  //------is user exist------//
  let user = await User.findOne({ email });

  //------Making the user if it doesn't exist-----//
  if (!user) {
    user = await makeUser();
  }

  return res.json(makeAuthRes(user));
};

module.exports = authGoogle;
