import express from 'express';
import productController from '../controllers/products';

const router = express.Router();

// Get the Products
router.get('/', productController.getProducts);

// Add Products
router.post('/', productController.addProducts);

module.exports = router;
