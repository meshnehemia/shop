const express = require('express');
const cors = require('cors');
const authRoutes = require('./routers/authRoutes');
const productRoutes = require('./routers/productRoutes');
const categoryRoutes = require('./routers/categoryRoutes');
const bookings = require('./routers/bookingRoutes');
const dashboard = require('./routers/dashboardRoutes')

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/booking' , bookings)
app.use('/api/dashboard' , dashboard)

app.get('/', (req, res) => {
  res.send('✅ Auth + WebSocket Server Running');
});

module.exports = app;
