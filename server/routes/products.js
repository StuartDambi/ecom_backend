import express from 'express';
import productController from '../controllers/products';

const router = express.Router();

// Get the Products
router.get('/', productController.getProducts);

// Get single Product
router.get('/:productId', productController.getProduct);

// Add Products
router.post('/', productController.addProducts);

// Update a Product
router.patch('/:productId', productController.updateProduct);

// Delete a product
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
