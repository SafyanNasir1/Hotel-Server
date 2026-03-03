const Booking = require("../models/Booking");
const Room = require("../models/Room");

const generateReview = async (bookingId) => {
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return;

    const room = await Room.findById(booking.roomId);
    if (!room) return;

    const review = {
      roomId: room._id,
      roomName: room.name,
      user: booking.userId || "Anonymous",
      rating: room.rating || 4.5,
      comment: "Booking made successfully",
      amount: booking.paymentAmount,
      date: new Date(),
    };

    console.log("Generated Review:", review);

    return review;
  } catch (err) {
    console.error("Error generating review:", err);
  }
};

module.exports = { generateReview };
