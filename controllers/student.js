const Exam = require("../model/add-exam");
const Attendence = require("../model/clear-attendence");
const ShoratgeAttendence = require("../model/shoratge-attendence");
const UniversityExam = require("../model/universityExam");
const bcryptjs = require("bcrypt");
const fs = require("fs");
const path = require("path");

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

exports.getDownloadClearAttendence = (req, res, next) => {
  const clearAttendence_id = req.params.clearAttendence_id;
  // const attendenceName = 'Clear Attendance.pdf';
  Attendence.findById(clearAttendence_id)
    .then((attendence) => {
      const attendencePath = path.join(attendence.file);
      const fileName = attendence.file.split("\\");
      fs.readFile(attendencePath, (err, data) => {
        console.log("getDownloadClearAttendence : data ::", data);
        if (err) {
          return next(err);
        }
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(`Content-Disposition`, `attachment; filename="${fileName[1]}"`);
        res.send(data);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.getDownloadShortageAttendence = (req,res,next) => {

  const shortageAttendence_id = req.params.shortageAttendence_id;
  ShoratgeAttendence.findById(shortageAttendence_id).then((shortageAttendence) => {
    const shortageAttendencePath = path.join(shortageAttendence.file);
    const fileName = shortageAttendence.file.split("\\");
    fs.readFile(shortageAttendencePath, (err, data) => {
      if(err){
        return next(err);
      }
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(`Content-Disposition`, `attachment; filename="${fileName[1]}"`);
      res.send(data);
    })
  })
  .catch((err) => {
    console.log(err);
  })
}