const express = require('express');

const router = express.Router();

router.get('/clear-attendence', (req, res, next) => res.render('student/clear-attendence',{pageTitle: 'clear-attendence'}) )
router.get('/ia-marks', (req, res, next) => res.render('student/ia-marks',{pageTitle: 'IA Marks'}) )
router.get('/', (req, res, next) => res.render('student/index', {pageTitle: 'Index'}) )
router.get('/profile', (req, res, next) => res.render('student/profile',{pageTitle: 'Profile'}) )
router.get('/shortage-attendence', (req, res, next) => res.render('student/shortage-attendence',{pageTitle: 'shortage-attendence'}) )

module.exports = router;