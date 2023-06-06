const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sizeSchema = new Schema({
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

const colorsSchema = new Schema({
  color: {
    type: String,
    required: true,
  },
  sizes: [sizeSchema],
  image: {
    type: String,
    required: true,
  },
});

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    minlength: [3, "Min 3 characters!"],
    lowercase: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    lowercase: true,
  },
  colors: [colorsSchema],
  price: {
    type: Number,
    required: [true, "Write price!"],
  },
  gender: {
    type: String,
    required: [true, "Select gender!"],
    lowercase: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
