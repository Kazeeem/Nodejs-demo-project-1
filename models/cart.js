const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const storagePath = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {

  static addProduct(id, productPrice) {
    fs.readFile(storagePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        try {
          cart = JSON.parse(fileContent);
        } catch (parseErr) {
          cart = { products: [], totalPrice: 0 };
        }
      }

      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];

      if (existingProduct) {
        existingProduct.qty += 1;
        cart.products[existingProductIndex] = existingProduct;
      } else {
        cart.products.push({ id: id, qty: 1 });
      }

      cart.totalPrice += +productPrice;

      fs.writeFile(storagePath, JSON.stringify(cart, null, 2), (err) => {
        console.log(err);
      });
    });
  }
}