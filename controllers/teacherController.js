const Teacher = require('../models/teacher');

exports.getProfilePage = (req, res, next) => {
  //'teacher/teacherProfile'
  res.send({
    path: '/teacher/teacherProfile',
    pageTitle: 'Teacher Profile'
  });
};

exports.getProfileByEmail = (req, res, next) => {
  const teacherEmail = req.params.teacher_email;
  Teacher.findOne({email: teacherEmail})
  .then(tea =>{
    //'teacher/teacher-detail'
    res.send({
      path: '/teacher/teacherProfile',
      pageTitle: 'Teacher Profile',
      tea: tea
    });
  })

};
  