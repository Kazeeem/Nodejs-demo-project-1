const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./util/path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);

app.get('/', (req, res, next) => {
  res.status(200).json({ 
    success: true,
    message: 'Hello from Express server!',
    data: null,
  }); 
});

app.use((req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', '404.html'));
});

http.createServer(app).listen(4000);

console.log('Server is listening on port 4000');