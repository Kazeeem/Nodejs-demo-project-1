const express = require('express');

const router = express.Router();

router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({ 
    success: true,
    message: 'Product added successfully!',
    data: req.body,
  });
});

module.exports = router;