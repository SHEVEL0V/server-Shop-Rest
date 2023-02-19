/** @format */
const fs = require("fs/promises");
const { authModel } = require("./auth");
const { Storage } = require("@google-cloud/storage");

const uploadFile = async (tempUpload, filename) => {
  const jwt = await authModel();
  const bucketName = "buket-image";
  const storage = new Storage({ authClient: jwt });
  const options = { destination: filename };

  const [File] = await storage.bucket(bucketName).upload(tempUpload, options);

  fs.unlink(tempUpload);

  if (!File) {
    throw new Error("Error upload file");
  }
  return File.metadata;
};

module.exports = { uploadFile };
