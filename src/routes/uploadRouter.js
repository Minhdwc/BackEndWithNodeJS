const express = require('express');
const router = express.Router();
const uploadImage = require('../Controllers/imageController');

router.post('/upload', uploadImage.uploadImage);


module.exports = router;