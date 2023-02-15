const express = require('express');
const beneficiaryController = require('../controllers/beneficiaryController');

const router = express.Router();

router
  .route('/')
  .get(beneficiaryController.getAllBeneficiaries)
  .post(beneficiaryController.addBeneficiary);

router
  .route('/:id')
  .get(beneficiaryController.getBeneficiary)
  .patch(beneficiaryController.updateBeneficiary)
  .delete(beneficiaryController.deleteBeneficiary);

module.exports = router;
