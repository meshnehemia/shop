const Booking = require('../models/bookings');

// @desc    Create new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ status:true, message: '✅ Booking created', booking });
  } catch (err) {
    res.status(500).json({ status:false, error: '❌ Failed to create booking', details: err.message });
  }
};

// @desc    Get bookings from last N days
// @route   GET /api/bookings/:days
exports.getBookingsByDays = async (req, res) => {
  const days = parseInt(req.params.days);
  const fromDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

  try {
    const bookings = await Booking.find({ bookedAt: { $gte: fromDate } }).sort({ bookedAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: '❌ Failed to fetch bookings', details: err.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ bookedAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: '❌ Could not retrieve bookings', details: err.message });
  }
};
