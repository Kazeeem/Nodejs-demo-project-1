const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {
    prods: products,
    hasProducts: products.length > 0,
    pageTitle: 'All Products - Shop',
    activeShop: true,
    productCSS: true,
  });
});

router.get('/products', (req, res, next) => {
  res.status(200).json({ 
    success: true,
    message: 'Products fetched successfully!',
    data: [
      { id: 1, name: 'Product 1', price: 29.99 },
      { id: 2, name: 'Product 2', price: 49.99 },
    ],
  });
});

module.exports = router;