const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { engine: hbsEngine } = require('express-handlebars');

const rootDir = require('./util/path');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

// Set the template engine to what we want to use (express-handlebars v6+)
app.engine('hbs', hbsEngine({
  extname: '.hbs',
  defaultLayout: 'main-layout',
  layoutsDir: path.join(rootDir, 'views', 'layouts')
}));
app.set('view engine', 'hbs');
app.set('views', 'views'); // Default value is 'views', so this line is optional

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData.routes);
app.use('/shop', shopRoutes);

app.get('/', (req, res, next) => {
  res.status(200).json({ 
    success: true,
    message: 'Hello from Express server!',
    data: null,
  }); 
});

app.use((req, res, next) => {
  res.render('404', { pageTitle: 'Page Not Found'});
});

// http.createServer(app).listen(4000);
app.listen(4000);

console.log('Server is listening on port 4000');