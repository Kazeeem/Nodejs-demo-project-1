const ProductModel = require('../../models/product');

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

exports.createProductPage = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product - Admin',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing: false,
  });
};

exports.createNewProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;

  const product = new ProductModel(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.editProductPage = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    res.redirect('/');
  }

  const prodId = req.params.productId;
  ProductModel.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product - Admin',
      path: '/admin/edit-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      editing: editMode,
      product: product,
    });
  });
};

exports.updateProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedPrice = req.body.price;

  const updatedProduct = new ProductModel(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  ProductModel.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }

    ProductModel.delete(prodId, () => {
      res.redirect('/admin/products');
    });
  });
};