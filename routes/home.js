const express = require('express');
const router = express.Router()

const homeController = require('../controllers/home');

router.get('/', homeController.getIndex);
router.post('/',homeController.postLoginAdmin)
router.post('/student',homeController.postStudent);
router.post('/faculty',homeController.postFaculty);

module.exports = router

