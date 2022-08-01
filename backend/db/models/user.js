const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    unique: true,
    validate: [],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
