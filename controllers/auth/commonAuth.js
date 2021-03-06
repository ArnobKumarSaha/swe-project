const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');
// validate (Check) on the auth route file, And get the result here .. In auth Controller file.
const Student = require('../../models/student');
const Teacher = require('../../models/teacher');
const Admin = require("../../models/admin");

exports.getLogin = (req, res, next) => {
  // If any logIn error occurs, flashing can be done on postLogin
  let message = req.flash('error');
  if (message.length > 0) { // if there is an error-flash
    message = message[0];
  } else {
    message = null;
  }
  //'auth/login', 
  res.send({
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    oldInput: {
      email: '',
      password: ''
    },
    validationErrors: []
  });
};

function loginHelper(req,res,errors){
  res.status(422).send( {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: errors.array()[0].msg,
    oldInput: {
      email: req.body.email,
      password: req.body.password,
      typeOfUser: req.body.typeOfUser
    },
    validationErrors: errors.array()
  });
};
  
exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password; 
  const typeOfUser = req.body.typeOfUser;

  const errors = validationResult(req);
  // if there are errors , send the same page (with user-entered info.)
  if (!errors.isEmpty()) {

    return loginHelper(req,res,errors);
  }

  console.log('typeOfUser = ', typeOfUser);

  // This block is for student login.
  if(typeOfUser == 'student'){
    Student.findOne({ email: email })
      .then(student => {
        // student exists with this email , bcz we checked it already in auth route.
        bcrypt
          .compare(password, student.password)
          .then(doMatch => {
            if (doMatch) { // password validation
              req.session.isLoggedIn = true;
              req.session.user = student;
              req.session.typeOfUser = typeOfUser;
              return req.session.save(err => {
                console.log('err = ', err);
                // res.redirect('/user');
                res.send({ "user": req.session.user})
              });
            }
            // Incorrect password entered.

            return res.status(422).send({
              path: '/login',
              pageTitle: 'Login',
              errorMessage: 'Invalid email or password',
              oldInput: {
                email: req.body.email,
                password: req.body.password,
                typeOfUser: req.body.typeOfUser
              },
              validationErrors: errors.array()
            });
          })
          .catch(err => {
            console.log(err);
            res.redirect('/login');
          });
      })
      .catch(err => console.log(err));
  }
  // Now this block is For Teacher Login
  else if(typeOfUser == 'teacher') {
    Teacher.findOne({ email: email })
    .then(teacher => {
      // teacher exists with this email , bcz we checked it already in auth route.
      bcrypt
        .compare(password, teacher.password)
        .then(doMatch => {
          if (doMatch) { // password validation
            req.session.isLoggedIn = true;
            req.session.user = teacher;
            req.session.typeOfUser = typeOfUser;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/user');
            });
          }
          // Incorrect password entered.

          return res.status(422).send({
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password',
            oldInput: {
              email: req.body.email,
              password: req.body.password,
              typeOfUser: req.body.typeOfUser
            },
            validationErrors: errors.array()
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
  }
  else {
    Admin.findOne({ email: email })
    .then(admin => {
      // admin exists with this email , bcz we checked it already in auth route.
      bcrypt
        .compare(password, admin.password)
        .then(doMatch => {
          if (doMatch) { // password validation
            req.session.isLoggedIn = true;
            req.session.user = admin;
            req.session.typeOfUser = typeOfUser;
            //console.log("matched. ", req.session.isLoggedIn, req.session.user, req.session.typeOfUser);
            return req.session.save(err => {
              console.log(err);
              res.redirect('/user');
            });
          }
          // Incorrect password entered.

          return res.status(422).send({
            path: '/login',
            pageTitle: 'Login',
            errorMessage: 'Invalid email or password',
            oldInput: {
              email: req.body.email,
              password: req.body.password,
              typeOfUser: req.body.typeOfUser
            },
            validationErrors: errors.array()
          });
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
  }
};
  
exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if(err) console.log(err);
    res.redirect('/');
  });
};

exports.isLoggedIn = (req, res, next) => {
  if(req.session != null){
    if(req.session.isLoggedIn){
      res.send({ isLoggedIn: true })
    }
    else{
      res.send({ isLoggedIn: false })
    }
  }else{
    res.send({ isLoggedIn: false })
  }
};

  