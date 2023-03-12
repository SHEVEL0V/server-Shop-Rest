/** @format */

const jwt = require("jsonwebtoken");
const RequestError = require("../helpers/error");

const authAdmin = (req, res, next) => {
  const { authorization } = req.headers;
  //-----if no authorization  header there return error-----//
  if (!authorization) {
    throw RequestError(401, "Please , provide Header: 'authorization' ");
  }

  const [type, token] = authorization.split(" ");

  //-----if token is not provided return error-----//
  if (!token) {
    throw RequestError(401, "Please , provide a token");
  }
  //-----if token type is not 'Bearer' return error-----//
  if (type !== "Bearer") {
    throw RequestError(401, "Token type not 'Bearer' ");
  }
  //-----verify token-----//
  const user = jwt.verify(token, process.env.JWT_SECRET);
  //-----if token is invalid return error-----//
  if (!user) {
    throw RequestError(401, "Invalid token");
  }

  //-----if user is not admin return error-----//
  if (user.role !== "admin") {
    throw RequestError(401, "User not status 'admin'");
  }

  console.log("<<auth admin>>");
  //-----next middleware-----//
  res.user = user;
  next();
};

module.exports = authAdmin;
