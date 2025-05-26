const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage } = require('../../Controllers/image.controller');

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

router.post('/upload', upload.single('image'), uploadImage);

module.exports = router;