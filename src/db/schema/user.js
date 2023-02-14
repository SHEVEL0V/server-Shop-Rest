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

    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
