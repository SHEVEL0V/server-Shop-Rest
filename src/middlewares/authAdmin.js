/** @format */

const jwt = require("jsonwebtoken");
const RequestError = require("../helpers/error");

const authAdmin = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw RequestError(401, "Please , provide Header: 'authorization' ");
  }

  const [type, token] = authorization.split(" ");

  if (!token) {
    throw RequestError(401, "Please , provide a token");
  }

  if (type !== "Bearer") {
    throw RequestError(401, "Token type not 'Bearer' ");
  }

  const user = jwt.verify(token, process.env.JWT_SECRET);

  if (user.role !== "admin") {
    throw RequestError(401, "User not status 'admin'");
  }
  console.log("<<auth admin>>");
  res.user = user;
  next();
};

module.exports = authAdmin;
