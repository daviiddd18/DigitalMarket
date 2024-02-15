import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  imageSrc: String,
  price: Number,
  description: String,
});

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
