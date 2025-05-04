const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');


router.get('/get-admin-id/:userId', adminController.getAdminID);
router.post('/add-doctor', adminController.addDoctor);
router.post('/add-admin-user', adminController.addAdminUser);

module.exports = router;