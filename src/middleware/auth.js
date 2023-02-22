/** @format */

const jwt = require("jsonwebtoken");
const RequestError = require("../helpers/error");

const auth = (req, res, next) => {
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

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    console.log("<<authorized OK!>>");

    next();
  } catch (err) {
    next(res.RequestError(401, err.message));
  }
};

module.exports = auth;
