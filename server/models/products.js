import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  productName: { Type: String, required: true },
  productPrice: { Type: Number, required: true },
  productWeight: { Type: Number, required: true },
  productDescription: { Type: String, required: true },
  productCategoryId: { Type: Number },
  productBrandd: { Type: String, required: true },
  productImage: { Type: String, required: true },
  productOption: { Type: String },
  productUpdateDate: { Type: Date },
});
module.exports = productSchema;
