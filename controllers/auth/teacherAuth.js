const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Teacher = require('../../models/teacher');

exports.getSignupTeacher = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    //'auth/signup-teacher'
    res.send({
      path: '/signup-teacher',
      pageTitle: 'Signup Teacher',
      errorMessage: message,
      oldInput: { // for better user experience... So that user don't have to enter all the fields again.
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        designation: ''
      },
      validationErrors: []
    });
  };
  
  
exports.postSignupTeacher = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const name = req.body.name;
    const designation = req.body.designation;

    const errors = validationResult(req);
    // if there are errors , send the same page (with user-entered info.)
    if (!errors.isEmpty()) {
        return res.status(422).send({
        path: '/signup-teacher',
        pageTitle: 'Signup Teacher',
        errorMessage: errors.array()[0].msg,
        oldInput: {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            name: name,
            designation: designation
        },
        validationErrors: errors.array()
        });
    }
    // If no error, encrypt the password, and save the teacher into database.
    bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
    const teacher = new Teacher({
        email: email,
        password: hashedPassword,
        designation: designation,
        name: name
    });
    return teacher.save();
    })
    .then(result => {
        res.redirect('/login');
    })
    .catch(err => {
        console.log(err);
    });
};
  