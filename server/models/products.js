import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  productName: { type: String },
  productPrice: { type: Number },
  productWeight: { type: Number },
  productDescription: { type: String },
  productCategoryId: { type: Number },
  productBrand: { type: String },
  productImage: { type: String },
  productOption: { type: String },
  productUpdateDate: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Product', productSchema);
