// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   role: {
//     type: String,
//     enum: ["user", "owner"],
//     default: "user",
//   },
// });

// module.exports = mongoose.model("User", userSchema);
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  },
});

export default mongoose.models.User || mongoose.model("User", userSchema);