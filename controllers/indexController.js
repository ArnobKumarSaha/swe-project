const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Course = require('../models/course');

exports.indexing = (req, res, next) => {
  Teacher.find()
  .then((teachers) => {

    Course.find()
    .then((courses) => {
      //'index-2'
      res.send({
        pageTitle: "teachers",
        teachers: teachers,
        courses: courses,
        path: '/index'
      });
    })
    
  })
  .catch((err) => console.log(err));
}

exports.showStudents = (req, res, next) => {
  Student.find()
    .then((students) => {
      //"student/student-list"
      res.send({
        pageTitle: "Students",
        path: "/students",
        students: students
      });
    })
    .catch((err) => console.log(err));
}

exports.showTeachers = (req, res, next) => {
  Teacher.find()
    .then((teachers) => {
      //'teacher/teacher-list'
      res.send({
        pageTitle: "teachers",
        path: "/teachers",
        teachers: teachers
      });
    })
    .catch((err) => console.log(err));
  }


exports.showCourses = (req, res, next) => {
  Course.find()
    .then((courses) => {
      //'course/courses-grid-sidebar'
      res.send({
        pageTitle: "courses",
        path: "/courses",
        courses: courses
      });
    })
    .catch((err) => console.log(err));
  }

exports.showCourseDetails = (req,res, next)=>{
  const courseId = req.params.courseId;
  Course.find({courseCode: courseId})
  .then(course => {
    //'course/course-detail'
    res.send({
      pageTitle: "Course Details",
      path: "/courses",
      myCourse: course
    })
  })
  .catch(err => {console.log(err);});
}


exports.getAbout = (req, res, next) => {
  //'others/about'
  res.send({
    pageTitle: "About",
    path: "/about",
  });
}

exports.getFaq = (req, res, next) => {
  //'others/faq'
  res.send({
    pageTitle: "Faq",
    path: "/faq",
  });
}

exports.getContacts = (req, res, next) => {
  //'others/contacts'
  res.send({
    pageTitle: "Contacts",
    path: "/contact",
  });
}
