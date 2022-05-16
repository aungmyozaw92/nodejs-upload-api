const express = require('express');

const router = express.Router();

const { createPayment } = require('../controllers/paymentController');

router.route('/payment').post(createPayment);

module.exports = router;