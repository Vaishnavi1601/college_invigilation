const Exam = require("../model/add-exam");
const Attendence = require("../model/clear-attendence");
const ShoratgeAttendence = require("../model/shoratge-attendence");
const UniversityExam = require("../model/universityExam");
const bcryptjs = require('bcrypt');

exports.getViewExam = (req, res, next) => {
  let data = {};
  Exam.find()
    .then((exams) => {
      data.exams = exams;
      return data;
    })
    .then((data) => {
      return UniversityExam.find().then((universityExam) => {
        data.universityExam = universityExam;
        return data;
      });
    })
    .then((data) => {
      console.log(data);
      return res.render("student/index", {
        pageTitle: "Student Dashboard",
        path: "/student/index",
        data: data,
      });
    });
};

// exports.getUniversityExam = (req, res, next) => {
//   UniversityExam.find().then((universityExam) => {
//     res.render("student/index", {
//       pageTitle: "University Exam",
//       path: "/student/index",
//       universityExam: universityExam,
//     });
//   });
// };

exports.getClearAttendence = (req, res, next) => {
  Attendence.find().then((clearAttendence) => {
    res.render("student/clear-attendence", {
      pageTitle: "Clear Attendence",
      clearAttendence: clearAttendence,
      path: "/student/clear-attendence",
    });
  });
};

exports.getShortageAttendence = (req, res, next) => {
  ShoratgeAttendence.find().then((shortageAttendence) => {
    res.render("student/shortage-attendence", {
      shortageAttendence: shortageAttendence,
      pageTitle: "Shortage Attendence |Admin Dashboard",
      path: "/student/shortage-attendence",
    });
  });
};
