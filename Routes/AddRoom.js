const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const upload = require("../Multer/Multer");

router.post("/", upload.array("images", 4), async (req, res) => {
  try {
    const { name, roomType, price, amenities } = req.body;
    const images = req.files ? req.files.map((file) => file.filename) : [];

    const room = new Room({
      name,
      roomType,
      price,
      amenities: JSON.parse(amenities),
      images: req.files ? req.files.map((file) => file.filename) : [],
    });

    await room.save();
    res.status(201).json(room);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", upload.array("images", 4), async (req, res) => {
  try {
    const { name, roomType, price, amenities } = req.body;
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    if (name) room.name = name;
    if (roomType) room.roomType = roomType;
    if (price) room.price = price;
    if (amenities) room.amenities = JSON.parse(amenities);
    if (req.files && req.files.length > 0) {
      room.images = req.files.map((file) => file.filename);
    }

    await room.save();
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
