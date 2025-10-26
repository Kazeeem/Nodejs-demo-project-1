const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { engine: hbsEngine } = require('express-handlebars');

const rootDir = require('./util/path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

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

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);

app.get('/', (req, res, next) => {
  res.status(200).json({ 
    success: true,
    message: 'Hello from Express server!',
    data: null,
  }); 
});

app.use(errorController.display404Page);

app.listen(4000);

console.log('Server is listening on port 4000');