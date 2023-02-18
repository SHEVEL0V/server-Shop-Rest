/** @format */

const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const tempDir = path.join(__dirname, "../../", "tmp");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, tempDir);
  },
  filename: (req, file, cd) => {
    cd(null, file.originalname);
  },
  limits: { fieldSize: 2048 },
});

const upload = multer({ storage });

module.exports = upload;
