const Exam = require("../model/add-exam");
const Attendence = require("../model/clear-attendence");
const ShoratgeAttendence = require("../model/shoratge-attendence");
const bcryptjs = require('bcrypt');

exports.getViewExam = (req, res, next) => {
  Exam.find().then((exams) => {
    res.render("faculty", {
      pageTitle: "Add Exam",
      path: "/faculty",
      exams: exams,
    });
  });
};

exports.getClearAttendence = (req, res, next) => {
  Attendence.find().then((clearAttendence) => {
    res.render("faculty/clear-attendence", {
      pageTitle: "Clear Attendence",
      clearAttendence: clearAttendence,
      path:"/faculty/clear-attendence"
    });
  });
};

exports.getShortageAttendence = (req, res, next) => {
  ShoratgeAttendence.find().then((shortageAttendence) => {
    res.render("faculty/shortage-attendence", {
      shortageAttendence: shortageAttendence,
      pageTitle: "Shortage Attendence |Admin Dashboard",
      path: "/faculty/shortage-attendence",
    });
  });
};