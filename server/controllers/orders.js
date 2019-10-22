import mongoose from 'mongoose';
import Order from '../models/orders';

const ordersController = {
  // Get all the orders
  getOrders: (req, res) => {
    Order.find()
      .select('product quantity comment _id')
      .exec()
      .then((docs) => {
        if (!docs) {
          return res.status(404).json({
            status: res.statusCode,
            message: 'You don\'t have any Orders',
          });
        }
        return res.status(200).json({
          status: res.statusCode,
          count: docs.length,
          orders: docs.map((doc) => ({
            // eslint-disable-next-line no-underscore-dangle
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            comment: doc.comment,
            request: {
              type: 'GET',
              // eslint-disable-next-line no-underscore-dangle
              url: `localhost:5000/api/orders/${doc._id}`,
            },
          })),
        });
      })
      .catch((error) => res.status(500).json({
        message: 'Something went wrong',
        error,
      }));
  },
  //   Add an Order
  addOrder: (req, res) => {
    const order = new Order({
      _id: mongoose.Types.ObjectId(),
      quantity: req.body.quantity,
      product: req.body.productId,
      comment: req.body.comment,
    });
    order.save()
      .then((result) => res.status(201).json({
        message: 'Your order has been recieved',
        createdOrder: {
          _id: result.id,
          product: result.product,
          quantity: result.quantity,
          comment: req.body.comment,
        },
        request: {
          type: 'GET',
          url: `localhost:5000/api/orders/${result.id}`,
        },
      }))
      .catch((error) => res.status(500).json({
        error,
      }));
  },
};
module.exports = ordersController;
