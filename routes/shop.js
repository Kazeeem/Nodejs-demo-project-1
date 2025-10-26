const express = require('express');
const productsController = require('../controllers/shop/product_controller');
const cartController = require('../controllers/shop/cart_controller');

const router = express.Router();

router.get('/', productsController.shopPage);

router.get('/products', productsController.getProducts);

router.get('/products/:productId', productsController.getProductDetails);

router.get('/cart', cartController.cartPage);

router.post('/add-to-cart', cartController.addToCart);

router.get('/orders', cartController.ordersPage);

router.get('/checkout', cartController.checkoutPage);

module.exports = router;