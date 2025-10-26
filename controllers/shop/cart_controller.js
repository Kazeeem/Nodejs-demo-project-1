const ProductModel = require('../../models/product');
const CartModel = require('../../models/cart');

exports.cartPage = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
    activeCart: true,
    productCSS: true,
  });
};

exports.addToCart = (req, res, next) => {
  const prodId = req.body.productId;

  ProductModel.findById(prodId, product => {
    CartModel.addProduct(prodId, product.price);
  });

  console.log('Added to cart');
  res.redirect('/cart');
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