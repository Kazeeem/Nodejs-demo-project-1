const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);
app.use(shopRoutes);

app.get('/', (req, res, next) => {
  res.status(200).json({ 
    success: true,
    message: 'Hello from Express server!',
    data: null,
  }); 
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found',
    data: null,
  });
});

http.createServer(app).listen(4000);

console.log('Server is listening on port 4000');