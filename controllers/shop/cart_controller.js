const ProductModel = require('../../models/product');

exports.cartPage = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
    activeCart: true,
    productCSS: true,
  });
};

exports.checkoutPage = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/checkout',
    activeCart: true,
    productCSS: true,
  });
};

exports.ordersPage = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'My Orders',
    path: '/orders',
    activeCart: true,
    productCSS: true,
  });
};