const express = require('express')

const router = express.Router()

const { createProduct, getProducts } = require('../controllers/productController')
const { uploadImage } = require('../controllers/uploadsController')

router.route('/').post(createProduct).get(getProducts)
router.route('/upload').post(uploadImage)

module.exports = router