/** @format */
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    token: String,
    avatarURL: {
      type: String,
      required: [true],
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
