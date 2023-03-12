/** @format */
const { OAuth2Client } = require("google-auth-library");

const verifyToken = async (token) => {
  const key = process.env.GOOGLE_CLIENT_ID;
  //----if key is not set, throw error----//
  if (!key) {
    throw RequestError(401, "No GOOGLE_KEY provided");
  }
  //-----authorize client-----//
  const client = new OAuth2Client(key);
  //-----verify token-----//
  const res = await client.verifyIdToken({ idToken: token });
  //-----return decoded token-----//
  return res.getPayload();
};

module.exports = verifyToken;
