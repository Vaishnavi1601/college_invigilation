const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const {isAuthAdmin} = require("../middlewares/isAuth");

const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});

const fileStorage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});


const fileStorage2 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "files");
  },
  filename: (req, file, cb) => {
    cb(null,file.originalname);
  },
});

const cAttendence = multer({ storage: fileStorage }).single("file");
const sAttendence = multer({ storage: fileStorage1 }).single("shortage-attendence");
const uExam = multer({ storage: fileStorage2 }).single("university-exam");

router.get("/profile/delete-admin/:admins_id",isAuthAdmin, adminController.postDeleteAdmin);
router.get('/profile',isAuthAdmin, adminController.getProfile);
router.post("/profile",isAuthAdmin,adminController.postProfile);

router.get('/',isAuthAdmin , (req, res, next) => res.render('admin/index'))

router.get('/add-student',isAuthAdmin, adminController.getAddStudent);
router.post('/add-student',isAuthAdmin, adminController.postAddStudent);
router.post('/edit-student',isAuthAdmin, adminController.postEditStudent);

router.get('/add-exam',isAuthAdmin, adminController.getAddExam );
router.post('/add-exam',isAuthAdmin, adminController.postAddExam );
router.get('/delete-exam/:exam_id',isAuthAdmin, adminController.postDeleteExam );

router.get('/add-faculty',isAuthAdmin, adminController.getAddFaculty );
router.post('/add-faculty',isAuthAdmin, adminController.postAddFaculty );
router.post('/edit-faculty',isAuthAdmin, adminController.postEditFaculty );

router.get('/clear-attendence' ,isAuthAdmin,adminController.getClearAttendence );
router.post('/clear-attendence',cAttendence, isAuthAdmin, adminController.postClearAttendence );
router.get('/clear-attendence/:cAttendence_id',isAuthAdmin, adminController.deleteClearAttendence);

router.get('/view-student',isAuthAdmin, adminController.getViewStudent );
router.get('/delete-student/:std_id',isAuthAdmin, adminController.postDeleteStudent);

router.get('/view-faculty',isAuthAdmin, adminController.getViewFaculty );
router.get('/delete-faculty/:faculty_id',isAuthAdmin, adminController.postDeleteFaculty);

router.get('/shortage-attendence',isAuthAdmin, adminController.getShortageAttendence);
router.post('/shortage-attendence', sAttendence, isAuthAdmin,adminController.postShoratgeAttendence);
router.get('/delete-attendence/:sAttendence_id',isAuthAdmin, adminController.postDeleteShortageAttendence);

router.get('/view-exam',isAuthAdmin, adminController.getViewExam );
// router.get('/view-exam/:exam_id', adminController.getExamTimeTable );

// router.get('/generate-plans', (req, res, next) => res.render('admin/generate-plans') )

router.get('/university-exam',isAuthAdmin, adminController.getUniversityExam );
router.post('/university-exam',isAuthAdmin, uExam , adminController.postUniversityExam );
router.get('/university-exam/:university_id',isAuthAdmin, adminController.postDeleteUniversityExam );

router.get('/logout',isAuthAdmin,adminController.adminLogout)

module.exports = router;

