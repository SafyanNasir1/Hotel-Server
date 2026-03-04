const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const { generateReview } = require("../controller/reviewController");
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    const review = await generateReview(booking._id);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Booking failed" });
  }
}); 

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to load bookings" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
