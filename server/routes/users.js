import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
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
      bcrypt.hash(req.body.password2, 10, (err, hash) => {
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
          password: req.body.password,
          password2: hash,

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

module.exports = router;
