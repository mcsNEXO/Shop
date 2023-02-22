const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoesSchema = new Schema({
  name: {
    type: String,
    unique: [true, "These shoes are already exist"],
  },
  type: {
    type: String,
  },
  colors: {
    type: Array,
  },
  size: {
    type: Array,
  },
  image: {
    type: Array,
  },
  price: {
    type: Number,
  },
  gender: {
    type: String,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const Shoes = mongoose.model("Shoes", shoesSchema);

module.exports = Shoes;
