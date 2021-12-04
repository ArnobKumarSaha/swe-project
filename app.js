var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const flash = require('connect-flash'); // to help users by showing what error occured.


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(cors());

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
});
  collection: 'sessions'

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

app.use(flash())
// Check if the requester is authenticated or not
const checkType = require('./utils/checkTypeOfUser');
app.use(checkType);

// isLoggedIn, user and typeOfUser of req.session are set in postLogin of authController
// But Note that , req.user is set in the above middleware.
// res.locals variables are passed to every views.
const setLocals = require('./utils/setReqLocals');
app.use(setLocals);

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/user')
var eventRouter = require('./routes/event')
var errorRouter = require('./routes/error')
var authRouter = require('./routes/authRoute')
var studentRouter = require('./routes/student')
var teacherRouter = require('./routes/teacher')
var adminRouter = require("./routes/admin")

var isStudent = require('./utils/middleware/is-Student')
var isTeacher = require('./utils/middleware/is-Teacher')
var isAdmin = require('./utils/middleware/is-Admin')

app.use('/user', usersRouter);
app.use('/events', eventRouter);
app.use('/student', isStudent, studentRouter);
app.use('/teacher', isTeacher, teacherRouter);
app.use('/admin', isAdmin, adminRouter);
app.use('/', indexRouter);
app.use(authRouter);
app.use(errorRouter);


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
