// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");
// const connectDB = require("./Mongoose/Mongoose");
// const addRoomRoute = require("./Routes/AddRoom");
// const bookingRoute = require("./Routes/Booking");
// const authRoute = require("./Routes/Auth");
// const dashboardRoute = require("./Routes/dashboard");


// dotenv.config();
// console.log("Mongo URI:", process.env.MONGO_URI);
// const app = express();
// connectDB();
// const PORT = process.env.PORT || 3000;
// const upload = require("./Multer/Multer")
// const Room = require("./models/Room");

// app.use(cors());
// app.use(express.json());
// app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));


// app.use("/api/rooms", addRoomRoute);
// app.use("/api/bookings", bookingRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/dashboard", dashboardRoute);

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: { origin: "*", methods: ["GET", "POST"] },
// });

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);
// });

// app.set("io", io);


// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./Mongoose/Mongoose");
const addRoomRoute = require("./Routes/AddRoom");
const bookingRoute = require("./Routes/Booking");
const authRoute = require("./Routes/Auth");
const dashboardRoute = require("./Routes/dashboard");

dotenv.config();

// MongoDB Connection
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/Uploads", express.static(path.join(__dirname, "Uploads")));

// Routes
app.use("/api/rooms", addRoomRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/auth", authRoute);
app.use("/api/dashboard", dashboardRoute);

// Basic Route for testing
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Vercel ke liye ye export lazmi hai
module.exports = app;

