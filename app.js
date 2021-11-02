var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// -----------------------------------------------------------------------------------

// Database related things 

const mongoose = require("mongoose");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const MONGODB_URI = "mongodb+srv://arnobkumarsaha:sustcse16@cluster0.nj6lk.mongodb.net/swe?retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.use(
  session({
    httpOnly: false,
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

// -----------------------------------------------------------------------------------

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var errorController = require('./controllers/error')

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(errorController.get404)


mongoose.connect(
    MONGODB_URI,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(result =>{
    app.listen(3000);
    console.log("MongoDB is connected !!      Listening on port 3000.");
  })
  .catch(err =>{
    console.log(err);
  });
  
module.exports = app;
