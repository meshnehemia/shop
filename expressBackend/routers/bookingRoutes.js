const express = require('express');
const router = express.Router();
const {
  createBooking,
  getBookingsByDays,
  getAllBookings
} = require('../controllers/bookingController');

// POST - New booking
router.post('/', createBooking);

// GET - All bookings
router.get('/', getAllBookings);

// GET - Bookings by number of days
router.get('/:days', getBookingsByDays);

module.exports = router;
