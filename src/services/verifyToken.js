/** @format */
const { OAuth2Client } = require("google-auth-library");

const verifyToken = async (token) => {
  const key = process.env.GOOGLE_CLIENT_ID;

  if (!key) {
    throw RequestError(401, "No GOOGLE_KEY provided");
  }

  const client = new OAuth2Client(key);

  const res = await client.verifyIdToken({ idToken: token });

  return res.getPayload();
};

module.exports = verifyToken;
