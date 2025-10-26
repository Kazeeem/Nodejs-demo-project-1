const products = [];

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
  products.push({title: req.body.title});
  res.redirect('/shop');
};

exports.getProducts = (req, res, next) => {
  res.render('shop', {
    prods: products,
    hasProducts: products.length > 0,
    pageTitle: 'All Products - Shop',
    activeShop: true,
    productCSS: true,
  });
};