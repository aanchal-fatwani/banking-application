const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  referenceNumber: {
    type: String,
    unique: true
  },
  date: {
    type: Date
  },
  amount: {
    type: Number
  },
  senderAccount: {
    type: String
  },
  receiverAccount: {
    type: String
  },
  receiverIfsc: {
    type: String
  },
  description: {
    type: String
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
