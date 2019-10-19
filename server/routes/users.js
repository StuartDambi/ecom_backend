import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users';

const router = express.Router();

router.post('/signup', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          status: res.statusCode,
          message: 'Email already exists',
        });
      }

      // eslint-disable-next-line consistent-return
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            status: res.statusCode,
            message: err,
          });
        }
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          telephone: req.body.telephone,
          fax: req.body.fax,
          company: req.body.company,
          address1: req.body.address1,
          address2: req.body.address2,
          city: req.body.city,
          postCode: req.body.postCode,
          country: req.body.country,
          state: req.body.state,
          password: hash,

        });
        newUser.save()
          .then((result) => {
            res.status(201).json({
              status: res.statusCode,
              message: 'You have successfully registered',
              user: result,
            });
          })
          .catch((error) => {
            res.status(500).json({
              status: res.statusCode,
              message: 'something went wrong',
              error,
            });
          });
      });
    });
});

router.post('/login', (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          status: res.statusCode,
          message: 'Authentication failed',
        });
      }
      // eslint-disable-next-line consistent-return
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Authentication failed',
          });
        }
        if (result) {
          const token = jwt.sign({
            email: user[0].email,
            // eslint-disable-next-line no-underscore-dangle
            userId: user[0]._id,
          }, process.env.JWT_KEY,
          {
            expiresIn: '1h',
          });
          return res.status(200).json({
            status: res.statusCode,
            message: 'Authentication successful',
            token,
          });
        }
      });
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
      return res.status(500).json({ error });
    });
});

module.exports = router;
