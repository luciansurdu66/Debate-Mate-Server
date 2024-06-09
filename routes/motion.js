const express = require('express');
const router = express.Router();
const {generateMotion} = require('../controllers/motionController');


router.post('/generate', generateMotion);

module.exports = router;