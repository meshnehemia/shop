const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',     // 👈 references Category model
    required: true
  },
  description: String,
  price: { type: Number, required: true },
  originalPrice: Number,
  badge: String,
  items: Number,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
