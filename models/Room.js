const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: { type: [String], default: [] },
  images: { type: [String], default: [] },
  rating: { type: Number, default: 4.5 },
  review: { type: String, default: "0 Reviews" },
  location: { type: String, default: "New York" },
});

module.exports = mongoose.model("Room", RoomSchema);
