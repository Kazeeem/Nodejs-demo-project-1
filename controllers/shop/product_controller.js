const ProductModel = require('../../models/product');
const path = require('../../util/path');

exports.shopPage = (req, res, next) => {
  ProductModel.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Welcome to Demo Shop',
        path: '/',
        activeShop: true,
        productCSS: true,
      });
    })
    .catch(err => {
      console.log(err);
    });
}

exports.getProducts = (req, res, next) => {
  ProductModel.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        path: '/shop',
        hasProducts: rows.length > 0,
        pageTitle: 'All Products - Shop',
        activeShop: true,
        productCSS: true,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.productId;

  ProductModel.fetchAll()
    .then(([rows, fieldData]) => {
      const product = rows.find(p => p.id === prodId);

      if (product) {
        res.render('shop/product-detail', {
          product: product,
          pageTitle: product.title,
          path: '/products',
          productCSS: true,
        });
      } 
      else {
        res.render('404', {
          pageTitle: 'Product Not Found',
          path: '/404',
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};