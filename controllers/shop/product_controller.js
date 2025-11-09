const ProductModel = require('../../models/product');

exports.shopPage = (req, res, next) => {
  ProductModel.fetchAll()
    .then(([rows]) => {
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
    .then(([rows]) => {
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

  ProductModel.findById(prodId)
    .then(([rows]) => {
      const product = rows[0];

      if (!product) {
        res.render('404', {
          pageTitle: 'Product Not Found',
          path: '/404',
        });
      }

      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
        productCSS: true,
      });
    })
    .catch(err => {
      console.log(err);
    });
};