const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();


router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  if (password !== user.password)
    return res.status(400).json({ message: "Invalid password" });

  // ✅ role DB se hi ayega
  const token = jwt.sign({ id: user._id, role: user.role }, "SECRET_KEY", {
    expiresIn: "1d",
  });

  res.json({
    token,
    user: {
      email: user.email,
      role: user.role,
    },
  });
});
// SIGNUP
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ email, password, role: "user" });
  res.json({ message: "Signup successful!", user });
});

module.exports = router;
