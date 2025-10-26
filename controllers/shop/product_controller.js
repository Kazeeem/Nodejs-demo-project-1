const ProductModel = require('../../models/product');
const path = require('../../util/path');

exports.shopPage = (req, res, next) => {
  ProductModel.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Welcome to Demo Shop',
      path: '/',
      activeShop: true,
      productCSS: true,
    });
  });
}

exports.getProducts = (req, res, next) => {
  ProductModel.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      path: '/shop',
      hasProducts: products.length > 0,
      pageTitle: 'All Products - Shop',
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.productId;
  ProductModel.fetchAll(products => {
    const product = products.find(p => p.id === prodId);
    if (product) {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
        productCSS: true,
      });
    } else {
      res.render('shop/404', {
        pageTitle: 'Product Not Found',
        path: '/404',
      });
    }
  });
};