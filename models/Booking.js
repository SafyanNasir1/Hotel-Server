const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    roomName: String,
    roomType: String,
    roomImage: String,
    price: Number,

    checkIn: String,
    checkOut: String,
    guests: Number,

    paymentAmount: Number,
    paymentStatus: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", BookingSchema);
