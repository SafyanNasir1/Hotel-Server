const express = require("express");
const auth = require("../Middelware/auth");
const adminOnly = require("../Middelware/AdminOnly");

const router = express.Router();

// Admin dashboard
router.post("/", auth, adminOnly, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

module.exports = router;
