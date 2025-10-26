const ProductModel = require('../models/product');

exports.createProductPage = (req, res, next) => {
  res.render('add-product', { 
    pageTitle: 'Add Product - Admin',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.createNewProduct = (req, res, next) => {
  console.log(req.body);
  const product = new ProductModel(req.body.title);
  product.save();
  res.redirect('/shop');
};

exports.getProducts = (req, res, next) => {
  ProductModel.fetchAll(products => {
    res.render('shop', {
      prods: products,
      hasProducts: products.length > 0,
      pageTitle: 'All Products - Shop',
      activeShop: true,
      productCSS: true,
    });
  });
};