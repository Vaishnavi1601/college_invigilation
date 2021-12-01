const Exam = require("../model/add-exam");
const Attendence = require("../model/clear-attendence");
const ShoratgeAttendence = require("../model/shoratge-attendence");
const bcryptjs = require('bcrypt');
const fs = require("fs");
const path = require("path");

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

exports.getDownloadClearAttendence = (req, res, next) => {
  const clearAttendence_id = req.params.clearAttendence_id;
  Attendence.findById(clearAttendence_id)
    .then((attendence) => {
      console.log(40, attendence);
      const attendencePath = path.join(attendence.file);
      const fileName = attendence.file.split("\\");
      fs.readFile(attendencePath, (err, data) => {
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