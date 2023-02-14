/** @format */

const jwt = require("jsonwebtoken");
const RequestError = require("../helpers/error");

const auth = (req, res, next) => {
  const { auth } = req.headers;

  if (!auth) {
    throw RequestError(401, "Please , provide Header: 'auth' ");
  }

  const [type, token] = auth.split(" ");

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
