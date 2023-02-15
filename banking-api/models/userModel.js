const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'Please tell us your name!']
  },
  username: {
    type: String,
    // required: [true, 'Please add your user name!']
  },
  password: {
    type: String,
    // required: [true, 'Please provide a password'],
    // minlength: 8,
    // select: false
  },
  pan: {
    type: String,
    // required: true
  },
  aadhaar: {
    type: String,
    // required: true
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    // required: [true, 'Please provide your email'],
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
  // passwordConfirm: {
  //   type: String,
  //   required: [true, 'Please confirm your password'],
  //   validate: {
  //     // This only works on CREATE and SAVE!!!
  //     validator: function (el) {
  //       return el === this.password;
  //     },
  //     message: 'Passwords are not the same!'
  //   }
  // }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
