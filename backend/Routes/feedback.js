const express = require('express');
const router = express.Router();
const feedbackController = require('../Controllers/feedbackController');

router.post('/submit', feedbackController.submitFeedback);
router.get('/all', feedbackController.getAllFeedbacks); // optional

module.exports = router;
