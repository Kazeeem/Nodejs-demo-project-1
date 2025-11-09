const ProductModel = require('../../models/product');

exports.getAllProducts = (req, res, next) => {
  ProductModel.fetchAll()
    .then(([rows]) => {
      res.render('admin/products', {
        prods: rows,
        path: '/admin/products',
        hasProducts: rows.length > 0,
        pageTitle: 'Admin Products',
        activeAdminProducts: true,
        productCSS: true,
      });
    })
    .catch(err => {
      console.log(err);
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
  product.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.editProductPage = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    res.redirect('/');
  }

  const prodId = req.params.productId;

  ProductModel.findById(prodId)
    .then(([rows]) => {
      if (rows.length === 0) {
        return res.render('404');
      }
      else {
        res.render('admin/edit-product', {
          pageTitle: 'Edit Product - Admin',
          path: '/admin/edit-product',
          formsCSS: true,
          productCSS: true,
          activeAddProduct: true,
          editing: editMode,
          product: rows[0],
        });
      }
    })
    .catch(err => {
      console.log(err);
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

  ProductModel.findById(prodId)
    .then(([rows]) => {
      if (rows.length === 0) {
        return res.render('404');
      }
      else {
        ProductModel.deleteById(rows[0].id)
          .then(() => {
            res.redirect('/admin/products');
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
  });
};