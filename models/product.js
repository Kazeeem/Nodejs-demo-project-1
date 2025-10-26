const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const storagePath = path.join(rootDir, 'data', 'products.json');

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
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

      products.push(this);
      fs.writeFile(storagePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
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
}