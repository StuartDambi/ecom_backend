import express from 'express';
import ordersController from '../controllers/orders';

const router = express.Router();

// Add an Order
router.post('/', ordersController.addOrder);

// Get Orders
router.get('/', ordersController.getOrders);

// Get single order
router.get('/:orderId', ordersController.getOrder);

// Update the Order
// router.patch('/:orderId', ordersController.updateOrder);

// Delete an order
// router.delete('/:orderId', ordersController.deleteOrder);

module.exports = router;
