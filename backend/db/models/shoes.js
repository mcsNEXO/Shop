const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoesSchema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  colors: {
    type: String,
  },
  size: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

const Shoes = mongoose.model("Shoes", shoesSchema);

module.exports = Shoes;
