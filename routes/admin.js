const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/add-product', productsController.createProductPage);

router.post('/add-product', productsController.createNewProduct);

module.exports = router;