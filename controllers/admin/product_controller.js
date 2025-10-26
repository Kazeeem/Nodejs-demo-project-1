const ProductModel = require('../../models/product');

exports.createProductPage = (req, res, next) => {
  res.render('admin/add-product', { 
    pageTitle: 'Add Product - Admin',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.createNewProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const product = new ProductModel(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getAllProducts = (req, res, next) => {
  ProductModel.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      path: '/admin/products',
      hasProducts: products.length > 0,
      pageTitle: 'Admin Products',
      activeAdminProducts: true,
      productCSS: true,
    });
  });
}