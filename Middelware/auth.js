// Middelware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // "Bearer tokenvalue"

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "SECRET_KEY"); // SAME key as login
    req.user = decoded; // id & role store ho gaya
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
