const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

router.get('/', productsController.getProducts);

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