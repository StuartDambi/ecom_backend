import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  telephone: String,
  fax: String,
  company: String,
  Address1: String,
  Address2: String,
  city: String,
  postCode: Number,
  country: String,
  state: String,
  password: String,
  password2: String,
});
module.exports = mongoose.model('User', userSchema);
