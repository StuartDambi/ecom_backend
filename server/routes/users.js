import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randomstring from 'randomstring';
import User from '../models/users';

const sendEmail = require('../misc/mailer');

const router = express.Router();

// USER REGISTRATION
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
        // Create verification token
        const verificationToken = randomstring.generate();

        // Flag the user as Innactive
        const active = false;

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
          verificationToken,
          active,

        });
        newUser.save()
          .then(async (result) => {
            // compose an EMail for the User
            const html = `Hi there,
            <br /> 
            Thank you for Registering with us!
            <br /><br />
            Please verify your Email by Typing the following token:
            <br />
            Token: <b>${verificationToken}</b>
            <br />
            on the following page <a href="">Noble.com</a>
            <br /><b />
            Have a good day!`;

            // Send Email to the user
            await sendEmail('noblemarket@info.com', user[0].email, 'Please Verify your Email', html);

            res.status(201).json({
              status: res.statusCode,
              message: 'Please check your EMail to verify your Account',
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

// VERIFY USER EMAIL
router.post('/verify', (req, res) => {
  User.find({ verificationToken: req.body.verificationToken })
    .exec()
    .then(async (user) => {
      if (user.length < 1) {
        return res.status(404).json({
          status: res.statusCode,
          message: 'The user does not Exist',
        });
      }
      // Verify the user
      // eslint-disable-next-line no-param-reassign
      user[0].active = true;
      // eslint-disable-next-line no-param-reassign
      user[0].verificationToken = '';
      await user[0].save();
      return res.status(200).json({
        status: res.statusCode,
        message: 'Verification Successfull',
      });
    })
    .catch((error) => res.status(500).json({
      error,
    }));
});

// USER LOGIN
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
          // Check if user is Verified
          if (user[0].active === false) {
            return res.status(404).json({
              message: 'Please verify your Email to continue',
            });
          }
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
