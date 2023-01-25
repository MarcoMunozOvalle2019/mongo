
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// connection to db
//mongoose.connect('mongodb://mongo/database')
console.log('puerto', process.env.URL)
//mongoose.connect('mongodb+srv://juanPerez2022:juanitoperez2022@cluster0.4vvdi.mongodb.net/test')
mongoose.connect(process.env.URL)

  .then(db => console.log('db connected'))
  .catch(err => console.log(err));

// importing routes
const indexRoutes = require('./routes/index');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
console.log('puerto', process.env.PORT)
// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}))
// routes
app.use('/', indexRoutes);

app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;