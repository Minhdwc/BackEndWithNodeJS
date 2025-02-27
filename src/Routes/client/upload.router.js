const express = require('express');
const router = express.Router();
const uploadImage = require('../../Controllers/image.controller');

router.post('/upload', uploadImage.uploadImage);


module.exports = router;