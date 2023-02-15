const Beneficiary = require('../models/beneficiaryModel');
const factory = require('./handlerFactory');

exports.getAllBeneficiaries = factory.getAll(Beneficiary);
exports.addBeneficiary = factory.createOne(Beneficiary);

exports.getBeneficiary = factory.getOne(Beneficiary);
exports.updateBeneficiary = factory.updateOne(Beneficiary);
exports.deleteBeneficiary = factory.deleteOne(Beneficiary);
