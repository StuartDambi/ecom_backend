import mongoose from 'mongoose';
import Product from '../models/products';

const productController = {
  getProducts: (req, res) => {
    Product.find((err, docs) => {
      if (err) {
        return res.status(500).json({
          status: res.statusCode,
          err,
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        docs,
      });
    });
  },
  //   Add Products
  addProducts: (req, res) => {
    const product = new Product({
      _id: mongoose.Types.ObjectId(),
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productWeight: req.body.productWeight,
      productDescription: req.body.productDescription,
      productCategoryId: req.body.productCategoryId,
      productBrand: req.body.productBrand,
      productImage: req.body.productImage,
      productOption: req.body.productOption,
    });
    // Save the product
    product.save()
      .then((result) => res.status(201).json({
        status: res.statusCode,
        result,
      }))
      .catch((error) => res.status(500).json({
        status: res.statusCode,
        error,
      }));
  },
};
module.exports = productController;
