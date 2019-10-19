import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  fax: { type: String, required: false },
  company: { type: String, required: false },
  address1: { type: String, required: true },
  address2: { type: String, required: false },
  city: { type: String, required: true },
  postCode: { type: Number, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  password: { type: String, required: true },
  password2: { type: String, required: true },
});
module.exports = mongoose.model('User', userSchema);