const express = require("express");

const router = express.Router();

const facultyController = require('../controllers/faculty')

router.get("/clear-attendence", facultyController.getClearAttendence);
router.get("/ia-marks", (req, res, next) =>
  res.render("faculty/ia-marks", { pageTitle: "IA Marks" })
);

router.get("/",facultyController.getViewExam);
router.get("/profile", (req, res, next) =>
  res.render("faculty/profile", { pageTitle: "Profile" })
);

router.get("/shortage-attendence", facultyController.getShortageAttendence);

module.exports = router;
