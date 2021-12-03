const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');
// validate (Check) on the auth route file, And get the result here .. In auth Controller file.
const Student = require('../models/student');


exports.getSignupStudent = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup-student', {
    path: '/signup-student',
    pageTitle: 'Signup Student',
    errorMessage: message,
    oldInput: { // for better user experience... So that user don't have to enter all the fields again.
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      regNo: ''
    },
    validationErrors: []
  });
};


exports.postSignupStudent = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const name = req.body.name;
  const regNo = req.body.regNo;

  const errors = validationResult(req);
  // if there are errors , render the same page (with user-entered info.)
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup-student', {
      path: '/signup-student',
      pageTitle: 'Signup Student',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        name: name,
        regNo: regNo
      },
      validationErrors: errors.array()
    });
  }
  // If no error, encrypt the password, and save the student into database.
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const student = new Student({
        email: email,
        password: hashedPassword,
        regNo: regNo,
        name: name
      });
      return student.save();
    })
    .then(result => {
      res.redirect('/login');
    })
    .catch(err => {
      console.log(err);
    });
};


