const express = require("express");
const studentAuthController = require("../controllers/auth/studentAuth");
const teacherAuthController = require("../controllers/auth/teacherAuth");
const commonAuthController = require("../controllers/auth/commonAuth");

const { check, body } = require("express-validator");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Admin = require("../models/admin");
const router = express.Router();


// Login routes here.

router.get("/login", commonAuthController.getLogin);

router.post("/login",
[
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email address.')
    .custom((value, { req }) => {
      const typeOfUser = req.body.typeOfUser;
      if(typeOfUser === 'student'){
        return Student.findOne({ email: value }).then(stuDoc => {
          if (!stuDoc) {
            return Promise.reject(
              'No Student with this email. Do you want to signUp ?'
            );
          }
        });
      }
      else if(typeOfUser === 'teacher'){
        return Teacher.findOne({ email: value }).then(teaDoc => {
          if (!teaDoc) {
            return Promise.reject(
              'No teacher with this email. Do you want to signUp ?'
            );
          }
        });
      }
      else{
        return Admin.findOne({ email: value }).then(adDoc => {
          if (!adDoc) {
            return Promise.reject(
              'No Admin with this email Found.'
            );
          }
        });
      }
    })
    .normalizeEmail(),
  body('password', 'Password has to be valid.')
    .isLength({ min: 4 })
],
commonAuthController.postLogin);


// *********************************************Student SignUp***********************************************************************

router.get("/signup-student", studentAuthController.getSignupStudent);

router.post("/signup-student",
[
    [
        check('email')
          .isEmail()
          .withMessage('Please enter a valid email.')
          .custom((value, { req }) => {
            return Student.findOne({ email: value }).then(stuDoc => {
              if (stuDoc) {
                return Promise.reject(
                  'E-Mail exists already, please pick a different one.'
                );
              }
            });
          })
          .normalizeEmail(),
        body('name').isString(),
        body('regNo')
          .isLength(10)
          .withMessage('Registration number have to be of length 10 exactly.'),
        body(
          'password',
          'Please enter a password with at least 4 characters.'
        )
          .isLength({ min: 4 }),
        body('confirmPassword')
          .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Passwords have to match!');
            }
            return true;
          })
      ],
], studentAuthController.postSignupStudent);

// -------------------------------------------------Teachers SignUp------------------------------------------------------------

router.get("/signup-teacher", teacherAuthController.getSignupTeacher);

router.post("/signup-teacher",
[
    [
        check('email')
          .isEmail()
          .withMessage('Please enter a valid email.')
          .custom((value, { req }) => {
            return Teacher.findOne({ email: value }).then(teaDoc => {
              if (teaDoc) {
                return Promise.reject(
                  'E-Mail exists already, please pick a different one.'
                );
              }
            });
          })
          .normalizeEmail(),
        body('name').isString(),
        body('designation')
          .isLength({min: 3})
          .withMessage('Designation should have minimum of length 3.'),
        body(
          'password',
          'Please enter a password with at least 4 characters.'
        )
          .isLength({ min: 4 }),
        body('confirmPassword')
          .custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Passwords have to match!');
            }
            return true;
          })
      ],
], teacherAuthController.postSignupTeacher);

router.post("/logout", commonAuthController.postLogout);

router.get("/isloggedin", commonAuthController.isLoggedIn)

module.exports = router;