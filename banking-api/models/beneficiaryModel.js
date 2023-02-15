const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
  accountNumber: {
    type: String,
  },
  ifsc: {
    type: String
  },
  beneficiaryName: {
    type: String
  },
  beneficiaryAccountNumber: {
    type: String,
  },
  beneficiaryIfsc: {
    type: String
  }
});

const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);

module.exports = Beneficiary;
