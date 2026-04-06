// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// /* SIGNUP */
// router.post("/signup", async (req, res) => {
//   try {
//     const { email, password, role } = req.body; // ✅ role add karo

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       role: role || "user", // ✅ now works
//     });

//     await newUser.save();

//     res.status(201).json({ message: "Signup successful" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// /* LOGIN */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password" });
//     }

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" },
//     );

//    res.json({
//      token,
//      user: {
//        id: user._id,
//        email: user.email,
//        role: user.role, // ✅ only here
//      },
//    });
//   } catch {
//     res.status(500).json({ message: "Server error" });
//   }

// });

// router.get("/make-owner", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: "shaffi@gmail.com" });

//     if (!user) {
//       return res.send("User not found");
//     }

//     user.role = "owner"; // 🔥 FORCE UPDATE
//     await user.save();

//     res.send("User updated to owner");
//   } catch (err) {
//     res.status(500).send("Error updating owner");
//   }
// });

// module.exports = router;
import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

/* MAIN HANDLER */
export default async function handler(req, res) {
  try {
    await connectDB();

    const { method } = req;
    const url = req.url;

    /* ---------------- SIGNUP ---------------- */
    if (method === "POST" && url.includes("/signup")) {
      const { email, password, role } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        email,
        password: hashedPassword,
        role: role || "user",
      });

      await newUser.save();

      return res.status(201).json({ message: "Signup successful" });
    }

    /* ---------------- LOGIN ---------------- */
    if (method === "POST" && url.includes("/login")) {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      return res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
    }

    /* ---------------- NOT FOUND ---------------- */
    return res.status(404).json({ message: "Route not found" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}