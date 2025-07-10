// 📁 controllers/dashboardController.js
const Product = require('../models/products');
const Customer = require('../models/user');
const Orders = require('../models/orders');
const Booking = require('../models/bookings');

exports.getDashboardData = async (req, res) => {
  try {
    const today = new Date();
    const past7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Total revenue = sum of price * quantity
    const products = await Product.find();
    const totalAsset = products.reduce((acc, p) => acc + (p.price * p.items), 0);

    // New customers (last 7 days)
    const newCustomersCount = await Customer.countDocuments({ createdAt: { $gte: past7Days } });
    
    //orders past 7 days 
    const newOrdersCount = await Orders.countDocuments({createdAt : {$gte: past7Days}})

    // Bookings in past 7 days
    const recentBookingsCount = await Booking.countDocuments({ bookedAt: { $gte: past7Days } });

    // Recent 3 bookings
    const recentBookings = await Booking.find().sort({ bookedAt: -1 }).limit(3);

    // Recent 5 customers
    const recentCustomers = await Customer.find().sort({ joined: -1 }).limit(5);

    // recent 3 orders
    const recentOrders = await Orders.find().sort({joined : -1}).limit(3);
    res.json({
      totalAsset,
      newCustomersCount,
      newOrdersCount,
      recentBookingsCount,
      recentBookings,
      recentCustomers,
      recentOrders
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load dashboard data', details: err.message });
  }
};
