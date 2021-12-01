const express = require("express");

const router = express.Router();

const facultyController = require('../controllers/faculty')
const {isAuthFaculty} = require("../middlewares/isAuth");

router.get("/clear-attendence",isAuthFaculty, facultyController.getClearAttendence);
router.get("/clear-attendence/:clearAttendence_id",isAuthFaculty, facultyController.getDownloadClearAttendence); 
router.get("/ia-marks", isAuthFaculty,(req, res, next) =>
  res.render("faculty/ia-marks", { pageTitle: "IA Marks" })
);

router.get("/",isAuthFaculty,facultyController.getViewExam);
router.get("/profile",isAuthFaculty, (req, res, next) =>
  res.render("faculty/profile", { pageTitle: "Profile" })
);

router.get("/shortage-attendence",isAuthFaculty, facultyController.getShortageAttendence);
router.get("/shortage-attendence/:shortageAttendence_id",isAuthFaculty, facultyController.getDownloadShortageAttendence);

module.exports = router;
