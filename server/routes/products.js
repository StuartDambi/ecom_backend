import express from 'express';
import productController from '../controllers/products';
import checkAuth from '../middleware/checkauth';

const router = express.Router();


//  PRODUCT ROUTES

// Get the Products
router.get('/', productController.getProducts);

// Get single Product
router.get('/:productId', productController.getProduct);

// Add Products
router.post('/', checkAuth, productController.addProducts);

// Update a Product
router.patch('/:productId', productController.updateProduct);

// Delete a product
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
