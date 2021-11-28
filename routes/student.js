const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student');
const {isAuthStudent} = require("../middlewares/isAuth");


router.get('/', isAuthStudent, studentController.getViewExam);
router.get('/clear-attendence', studentController.getClearAttendence )
router.get('/ia-marks', (req, res, next) => res.render('student/ia-marks',{pageTitle: 'IA Marks'}) )
router.get('/profile', (req, res, next) => res.render('student/profile',{pageTitle: 'Profile'}) )
router.get('/shortage-attendence', studentController.getShortageAttendence )

module.exports = router;