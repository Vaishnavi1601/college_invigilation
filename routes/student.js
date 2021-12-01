const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const {isAuthStudent} = require("../middlewares/isAuth");


router.get('/', isAuthStudent, studentController.getViewExam);
router.get('/clear-attendence',isAuthStudent, studentController.getClearAttendence )
router.get('/clear-attendence/:clearAttendence_id',isAuthStudent,studentController.getDownloadClearAttendence )
router.get('/ia-marks', isAuthStudent, (req, res, next) => res.render('student/ia-marks',{pageTitle: 'IA Marks'}) )
router.get('/profile',isAuthStudent,  (req, res, next) => res.render('student/profile',{pageTitle: 'Profile'}) )
router.get('/shortage-attendence',isAuthStudent, studentController.getShortageAttendence )
router.get('/shortage-attendence/:shortageAttendence_id',isAuthStudent, studentController.getDownloadShortageAttendence )

module.exports = router;




