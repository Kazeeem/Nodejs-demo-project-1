const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const storagePath = path.join(rootDir, 'data', 'products.json');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    fs.readFile(storagePath, (err, fileContent) => {
      let products = [];

      if (!err) {
        try {
          products = JSON.parse(fileContent);
        } catch (parseErr) {
          // If the file is empty or contains invalid JSON, start with an empty array
          products = [];
        }
      }

      if (this.id) {
        // Update existing product
        const existingProductIndex = products.findIndex(p => p.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        fs.writeFile(storagePath, JSON.stringify(updatedProducts, null, 2), (err) => {
          console.log(err);
        });
      }
      else {
        this.id = Math.random().toString();

        products.push(this);
        fs.writeFile(storagePath, JSON.stringify(products, null, 2), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(callback) {
    fs.readFile(storagePath, (err, fileContent) => {
      if (err) {
        // File not found or read error — return empty list
        return callback([]);
      }

      if (!fileContent) {
        return callback([]);
      }

      try {
        const products = JSON.parse(fileContent);
        callback(products);
      } catch (parseErr) {
        // Invalid or empty JSON — return empty list instead of throwing
        callback([]);
      }
    });
  }

  static findById(id, callback) {
    Product.fetchAll(products => {
      const product = products.find(p => p.id === id);
      callback(product);
    });
  }
}