const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();
const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-')+ "-" + file.originalname);
  },
});

const fileStorage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-')+ "-" + file.originalname);
  },
});


const fileStorage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-')+ "-" + file.originalname);
  },
});

const cAttendence = multer({ storage: fileStorage }).single("file");
const sAttendence = multer({ storage: fileStorage1 }).single("shortage-attendence");
const uExam = multer({ storage: fileStorage2 }).single("university-exam");

router.get('/', (req, res, next) => res.render('admin/index'))

router.get('/profile', adminController.getProfile);
router.post("/profile",adminController.postProfile);
router.get("/profile/delete-admin/:admin_id",adminController.postDeleteAdmin);

router.get('/add-student', adminController.getAddStudent);
router.post('/add-student', adminController.postAddStudent);
router.post('/edit-student', adminController.postEditStudent);

router.get('/add-exam', adminController.getAddExam );
router.post('/add-exam', adminController.postAddExam );
router.get('/delete-exam/:exam_id', adminController.postDeleteExam );

router.get('/add-faculty', adminController.getAddFaculty );
router.post('/add-faculty', adminController.postAddFaculty );
router.post('/edit-faculty', adminController.postEditFaculty );

router.get('/clear-attendence' ,adminController.getClearAttendence );
router.post('/clear-attendence',cAttendence,  adminController.postClearAttendence );
router.get('/clear-attendence/:cAttendence_id', adminController.deleteClearAttendence);

router.get('/view-student', adminController.getViewStudent );
router.get('/delete-student/:std_id', adminController.postDeleteStudent);

router.get('/view-faculty', adminController.getViewFaculty );
router.get('/delete-faculty/:faculty_id', adminController.postDeleteFaculty);

router.get('/shortage-attendence', adminController.getShortageAttendence);
router.post('/shortage-attendence', sAttendence, adminController.postShoratgeAttendence);
router.get('/delete-attendence/:sAttendence_id', adminController.postDeleteShortageAttendence);

router.get('/view-exam', adminController.getViewExam );
// router.get('/view-exam/:exam_id', adminController.getExamTimeTable );

router.get('/generate-plans', (req, res, next) => res.render('admin/generate-plans') )

router.get('/university-exam', adminController.getUniversityExam );
router.post('/university-exam', uExam , adminController.postUniversityExam );
router.get('/university-exam/:university_id', adminController.postDeleteUniversityExam );

module.exports = router;

