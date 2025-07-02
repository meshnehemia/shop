const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  product: {
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    price: Number
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, required: true },
  message: { type: String },
  bookedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);
