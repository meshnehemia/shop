const Order = require('../models/orders');
const Product = require('../models/products');


exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingInfo,
      paymentInfo,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body;

    // Step 1: Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items provided.'
      });
    }

    let calculatedItemsPrice = 0;
    const orderItems = [];

    // Step 2: Loop through items and fetch product details
    for (const item of items) {
      const product = await Product.findById(item.product).exec();

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found with id: ${item.product}`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for: ${product.name}`
        });
      }

      calculatedItemsPrice += product.price * item.quantity;

      // DEBUG
      console.log("→ Adding item:", {
        name: product.name,
        productId: item.product,
        quantity: item.quantity,
        price:calculatedItemsPrice,
        productPrice : product.price,


      });

      orderItems.push({
        productId: item.product,
        name: product.name ?? 'Unnamed Product',
        price: product.price,
        quantity: item.quantity,
        image: product.images?.[0] || 'no-image.jpg'
      });
    }

    // Step 3: Validate total price
    if (itemsPrice <= calculatedItemsPrice-1) {
      return res.status(400).json({
        success: false,
        message: 'Items price mismatch.',
        expected: calculatedItemsPrice,
        received: itemsPrice
      });
    }

    // Step 4: Validate payment info
    if (!paymentInfo?.amountPaid) {
      return res.status(400).json({
        success: false,
        message: 'Payment amountPaid is required.'
      });
    }

    // Step 5: Create and save order
    const order = new Order({
      user: req.user.id,
      items: orderItems,
      shippingInfo,
      paymentInfo,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    await order.save(); // `orderId` auto-generated in model's pre('validate')

    // Step 6: Update product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity }
      });
    }

    // Step 7: Respond
    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });

  } catch (error) {
    console.error('❌ Create order error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

// {
//   "items": [
//     {
//       "product": "6863a1fd343b1c0e1360240e",
//       "quantity": 2
//     },
//     {
//       "product": "6863a1fd343b1c0e1360240e",
//       "quantity": 1
//     },
//     {
//       "product": "6863a1fd343b1c0e1360240e",
//       "quantity": 3
//     }
//   ],
//   "shippingInfo": {
//     "address": "123 Main Street",
//     "city": "New York",
//     "state": "NY",
//     "country": "USA",
//     "postalCode": "10001",
//     "phone": "+1234567890"
//   },
//   "paymentInfo": {
//   "id": "pi_1JX9Zt2eZvKYlo2C0wXKQ1X2",
//   "status": "succeeded",
//   "method": "card",
//   "amountPaid": 800
// },
//   "paymentMethod": "card",
//   "itemsPrice": 719.9399999999999,
//   "taxPrice": 27.68,
//   "shippingPrice": 15.99,
//   "totalPrice": 800
// }

exports.getMyOrders =async (req, res) => {
  const orders = await Order.find({ user: req.user.id })
    .sort('-createdAt')
    .populate('items.product', 'name price images');

  res.status(200).json({
    success: true,
    count: orders.length,
    data: orders
  });
};

exports.getOrder =async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');

  if (!order) {
    return next(new ErrorResponse(`Order not found with id ${req.params.id}`, 404));
  }

  // Make sure user owns the order or is admin
  if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse('Not authorized to access this order', 401));
  }

  res.status(200).json({
    success: true,
    data: order
  });
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  const { status, trackingNumber, estimatedDelivery } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse(`Order not found with id ${req.params.id}`, 404));
  }

  // Validate status transition
  const validTransitions = {
    processing: ['shipped', 'cancelled'],
    shipped: ['delivered', 'returned'],
    delivered: ['returned'],
    cancelled: [],
    returned: []
  };

  if (!validTransitions[order.orderStatus].includes(status)) {
    return next(new ErrorResponse(`Invalid status transition from ${order.orderStatus} to ${status}`, 400));
  }

  order.orderStatus = status;
  if (trackingNumber) order.trackingNumber = trackingNumber;
  if (estimatedDelivery) order.estimatedDelivery = estimatedDelivery;

  await order.save();

  res.status(200).json({
    success: true,
    data: order
  });
};

exports.cancelOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorResponse(`Order not found with id ${req.params.id}`, 404));
  }

  // Make sure user owns the order
  if (order.user.toString() !== req.user.id) {
    return next(new ErrorResponse('Not authorized to cancel this order', 401));
  }

  // Only allow cancellation if order is still processing
  if (order.orderStatus !== 'processing') {
    return next(new ErrorResponse('Order can only be cancelled while processing', 400));
  }

  order.orderStatus = 'cancelled';

  // Restore product stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: item.quantity }
    });
  }

  await order.save();

  res.status(200).json({
    success: true,
    data: order
  });
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'firstname lastname username email createdAt lastLogin') // Optional: populate user info
      .populate({
        path: 'items.productId',
        select: 'title price image description category',
        model: 'Product' // Make sure this matches your Product model name
      })
      .sort({ createdAt: -1 }); // Sort newest first

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    console.error('❌ Failed to fetch orders:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders',
      error: error.message
    });
  }
};