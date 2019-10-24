import express from 'express';
import multer from 'multer';
import productController from '../controllers/products';

// store the images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});
// Filter Images
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  }
  cb(null, false);
};
// Upload product Images
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
});
const router = express.Router();


//  PRODUCT ROUTES

// Get the Products
router.get('/', productController.getProducts);

// Get single Product
router.get('/:productId', productController.getProduct);

// Add Products
router.post('/', upload.single('productImage'), productController.addProducts);

// Update a Product
router.patch('/:productId', productController.updateProduct);

// Delete a product
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
