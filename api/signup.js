// import connectDB from "../models/db.js";
// import User from "../models/user.js";
// import bcrypt from "bcrypt";

// export default async function handler(req, res) {
//   if (req.method !== "POST")
//     return res.status(405).json({ message: "Method not allowed" });

//   await connectDB();

//   try {
//     const { email, password, role } = req.body;
//     const userExists = await User.findOne({ email });

//     if (userExists)
//       return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       email,
//       password: hashedPassword,
//       role: role || "user",
//     });

//     await newUser.save();
//     return res.status(201).json({ message: "Signup successful" });
//   } catch (err) {
//     return res.status(500).json({ message: "Server error" });
//   }
// }
import connectDB from "../models/db.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

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
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}