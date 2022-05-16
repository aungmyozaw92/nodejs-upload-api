const express = require('express');

const router = express.Router();

const { sendEmailEthereal,sendEmail } = require('../controllers/emailController');

router.route('/send').get(sendEmailEthereal)
router.route('/sendgrid').get(sendEmail);

module.exports = router