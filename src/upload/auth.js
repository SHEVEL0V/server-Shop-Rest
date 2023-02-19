/** @format */

const { auth } = require("google-auth-library");

const authModel = async () => {
  const keysEnvVar = process.env.CREDS;

  if (!keysEnvVar) {
    throw new Error("The $CREDS environment variable was not found!");
  }

  const keys = JSON.parse(keysEnvVar);

  // load the JWT or UserRefreshClient from the keys
  const client = auth.fromJSON(keys);
  // __________________________________________________________________________
  client.scopes = ["https://www.googleapis.com/auth/cloud-platform"];
  const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
  const res = await client.request({ url });
  console.log(`Connect google storage "${res.data.id}" `);
  // __________________________________________________________________________
  return client;
};

module.exports = { authModel };
