const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({ 
    success: true,
    message: 'Product added successfully!',
    data: req.body,
  });
});

module.exports = router;