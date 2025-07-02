const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: {
    type: String,
    required: true
  }
});

const shippingInfoSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true, default: 'USA' },
  postalCode: { type: String, required: true },
  phone: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  items: [orderItemSchema],
  shippingInfo: shippingInfoSchema,
  paymentInfo: {
    id: { type: String, required: true },
    status: { type: String, required: true },
    method: { type: String, required: true },
    amountPaid: { type: Number, required: true }
  },
  orderStatus: {
    type: String,
    enum: ['processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'processing'
  },
  trackingNumber: {
    type: String,
    default: () => `TRK-${Math.floor(100000 + Math.random() * 900000)}`
  },
  estimatedDelivery: {
    type: Date,
    default: () => {
      const today = new Date();
      today.setDate(today.getDate() + 7);
      return today;
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Fix: generate orderId before validation
orderSchema.pre('validate', async function (next) {
  if (!this.orderId) {
    const count = await this.constructor.countDocuments();
    this.orderId = `ORD-${10000 + count}`;
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', orderSchema);
