const express = require('express');
const {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
  getOrders
} = require('../controllers/orderController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/',createOrder)
router.get('/',getOrders);

router.get('/myorders',getMyOrders);

router.get('/:id',getOrder);

router.put('/:id/status',updateOrderStatus);

router.put('/:id/cancel', cancelOrder);

module.exports = router;