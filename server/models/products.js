import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productWeight: { type: Number, required: true },
  productDescription: { type: String, required: true },
  productCategoryId: { type: Number },
  productBrand: { type: String, required: true },
  productImage: { type: String, required: true },
  productOption: { type: String },
  productUpdateDate: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Product', productSchema);
