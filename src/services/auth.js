/** @format */

const { auth, OAuth2Client } = require("google-auth-library");

const authModelCloud = async () => {
  const keysEnvVar = process.env.CREDS;

  if (!keysEnvVar) {
    throw new Error("The $CREDS environment variable was not found!");
  }

  const keys = JSON.parse(keysEnvVar);

  // load the JWT or UserRefreshClient from the keys
  const client = new auth.fromJSON(keys);
  // __________________________________________________________________________
  client.scopes = ["https://www.googleapis.com/auth/cloud-platform"];
  const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
  const res = await client.request({ url });
  console.log(`Connect google storage "${res.data.id}" `);
  // __________________________________________________________________________
  return client;
};

const verifyToken = async (token) => {
  const key = process.env.GOOGLE_CLIENT_ID;

  if (!key) {
    throw RequestError(401, "No GOOGLE_KEY provided");
  }

  const client = new OAuth2Client(key);

  const res = await client.verifyIdToken({ idToken: token });

  if (res.error) {
    throw new Error(res.error.message);
  }
  return res.getPayload();
};

module.exports = { authModelCloud, verifyToken };
