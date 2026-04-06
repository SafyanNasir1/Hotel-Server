import connectDB from "../models/db.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  await connectDB();

  try {
    const { email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();
    return res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}
