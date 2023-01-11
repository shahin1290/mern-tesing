import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  description: String,
  name: String,
  price: Number,
  imageFile: String,

});

const ProductModal = mongoose.model("Product", productSchema);

export default ProductModal;
