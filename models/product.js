const db = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    if (this.id) {
      return db.execute(
        'UPDATE products SET title = ?, price = ?, imageUrl = ?, description = ? WHERE id = ? LIMIT 1',
        [this.title, this.price, this.imageUrl, this.description, this.id]
      );
    }
    
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ? LIMIT 1', [id]);
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE products.id = ? LIMIT 1', [id]);
  }
}