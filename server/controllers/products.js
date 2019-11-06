import mongoose from 'mongoose';
import Product from '../models/products';

const productController = {
  // Get all products
  getProducts: (req, res) => {
    Product.find().select('productName productPrice productWeight productDescription productBrand productOption _id')
      .exec()
      .then((docs) => {
        const response = {
          count: docs.length,
          products: docs.map((doc) => ({
            // eslint-disable-next-line no-underscore-dangle
            _id: doc._id,
            productName: doc.productName,
            productPrice: doc.productPrice,
            productWeight: doc.productWeight,
            productDescription: doc.productDescription,
            productBrand: doc.productBrand,
            productOption: doc.productOption,
            productCategoryId: doc.productCategoryId,
            request: {
              type: 'GET',
              // eslint-disable-next-line no-underscore-dangle
              url: `localhost:5000/api/products/${doc._id}`,
            },
          })),
        };
        return res.status(200).json({
          status: res.statusCode,
          response,
        });
      })
      .catch((error) => res.status(500).json({
        error,
      }));
  },
  //   Get one Product
  getProduct: (req, res) => {
    const id = req.params.productId;
    Product.findById(id).exec()
      .then((doc) => {
        if (doc) {
          res.status(200).json({
            status: res.statusCode,
            doc,
          });
        } else if (!doc) {
          return res.status(400).json({
            status: res.statusCode,
            message: 'Product doesn\'t exist',
          });
        }
        return res.status(404).json({
          status: res.statusCode,
          message: 'Please check that the Id entered has a correct syntax',
        });
      })
      .catch((error) => res.status(500).json({
        status: res.statusCode,
        error,
      }));
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
  //   Delete a Product
  deleteProduct: (req, res) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
      .exec()
      .then((result) => {
        if (result) {
          res.status(200).json({
            status: res.statusCode,
            message: 'Products has been deleted',
            result,
          });
        }
        return res.status(404).json({
          status: res.statusCode,
          message: 'Product does not exist',
        });
      })
      .catch((error) => res.status(500).json({
        message: 'Something went wrong',
        error,
      }));
  },
  //   Update the Product
  updateProduct: (req, res) => {
    const id = req.params.productId;
    const updateOps = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
      .exec()
      .then((result) => {
        if (result) {
          return res.status(200).json({
            status: res.statusCode,
            message: 'Product updated',
            request: {
              type: 'GET',
              url: `localhost:5000/api/products/${id}`,
            },
          });
        }
        return res.status(404).json({
          status: res.statusCode,
          message: 'Product does not exist',
        });
      })
      .catch((error) => res.status(500).json({
        error,
      }));
  },
};
module.exports = productController;
