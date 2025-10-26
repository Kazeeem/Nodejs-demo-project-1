const express = require('express');
const productController = require('../controllers/admin/product_controller');

const router = express.Router();

router.get('/add-product', productController.createProductPage);

router.post('/add-product', productController.createNewProduct);

router.get('/products', productController.getAllProducts);

module.exports = router;