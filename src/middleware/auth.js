/** @format */

const jwt = require("jsonwebtoken");
const RequestError = require("../helpers/error");

const auth = (req, res, next) => {
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

  try {
    //-----verify token-----//
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    console.log("<<authorized OK!>>");
    //-----next middleware-----//
    next();
  } catch (err) {
    //-----if token is invalid return error-----//
    next(res.RequestError(401, err.message));
  }
};

module.exports = auth;
