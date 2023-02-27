const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  pan: {
    type: String,
  },
  aadhaar: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  mobile: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  branch: {
    type: String
  },
  ifsc: {
    type: String
  },
  accountNumber: {
    type: String,
    unique: true
  },
  balance: {
    type: Number
  },
  dateOfOpening: {
    type: Date
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
