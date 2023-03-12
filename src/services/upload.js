/** @format */
const fs = require("fs/promises");
const { authModelCloud } = require("./auth");
const { Storage } = require("@google-cloud/storage");

const uploadFile = async (path, filename) => {
  const jwt = await authModelCloud();
  const bucketName = "buket-image";
  const storage = new Storage({ authClient: jwt });
  const options = { destination: filename };

  //------if path is not provided return error------//
  if (!path) {
    throw RequestError(404, "Absent file");
  }
  //------upload file to google cloud storage------//
  const [File] = await storage.bucket(bucketName).upload(path, options);
  //------remove file from tmp folder------//
  fs.unlink(path);
  //------if URL is not provided return error------//
  if (!File) {
    throw new Error("Error upload file");
  }
  return File.metadata;
};

module.exports = { uploadFile };
